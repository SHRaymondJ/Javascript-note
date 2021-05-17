import axios from 'axios'
import { ajaxUrl } from '../../ajaxUrl.json'
import Qs from 'qs'

interface AxiosFunctionType {
    (object: { URL: string; JSONOBJ: object; BASE?: string }): Promise<any>
}

const url =
    ajaxUrl ||
    'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend'

const AxiosPost: AxiosFunctionType = async ({ URL, JSONOBJ, BASE = '' }) => {
    const response = await axios({
        url,
        method: 'post',
        data: Qs.stringify({
            url: BASE + URL,
            jsonStr: JSON.stringify(JSONOBJ),
        }),
    }).catch((err) => console.log('Err: ', err))
    if (response && response.data) {
        return JSON.parse(response.data)
    }
}

export default AxiosPost
