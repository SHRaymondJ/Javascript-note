import axios from 'axios'
import { ajaxUrl } from '../../ajaxUrl.json'
import Qs from 'qs'

interface AxiosArgumentsType {
  URL: string
  JSONOBJ: object
  BASE?: string
}

interface AxiosFunctionType {
  ({}: AxiosArgumentsType): Promise<object>
}

const url =
  ajaxUrl ||
  'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend'

const AxiosPost: AxiosFunctionType = async ({ URL, JSONOBJ, BASE }) => {
  const response = await axios({
    url,
    method: 'post',
    data: Qs.stringify({
      url: URL,
      base: BASE,
      jsonStr: JSON.stringify(JSONOBJ),
    }),
  }).catch((err) => console.log('Err: ', err))
  if (response && response.data) {
    return JSON.parse(response.data)
  }
}

export default AxiosPost
