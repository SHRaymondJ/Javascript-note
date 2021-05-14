import axios from 'axios'
import { ajaxUrl } from '../../ajaxUrl.json'
import Qs from 'qs'

interface AxiosArgumentsType {
    (dataURL: string, jsonObj: object): Promise<void | object>
}

const url =
    ajaxUrl ||
    'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend'

const AxiosPost: AxiosArgumentsType = async (dataURL, jsonObj) => {
    const response = await axios({
        url,
        method: 'post',
        data: Qs.stringify({
            url: dataURL,
            jsonStr: JSON.stringify(jsonObj),
        }),
    }).catch((err) => console.log('Err: ', err))
    if (response && response.data) {
        return JSON.parse(response.data)
    }
}

export default AxiosPost
