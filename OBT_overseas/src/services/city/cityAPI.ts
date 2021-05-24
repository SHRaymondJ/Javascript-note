import AxiosPost from '../AxiosPost'

const BASE = localStorage.BASE
const token = localStorage?.token

const fetchTravelRequestCity = async (travelRequestNo: string, key: string) => {
    const URL = '/SystemService.svc/GetTravelRequestCityInfo'
    const JSONOBJ = {
        key,
        travelRequestNo,
        count: '',
    }
    const request = await AxiosPost({ URL, JSONOBJ, BASE })
    return request
}

const fetchCityByOrder = async (travelRequestNo: string, key: string) => {
    const URL = '/SystemService.svc/InitLimitCitys'
    const JSONOBJ = {
        key,
        travelRequestNo,
    }
    const request = await AxiosPost({ URL, JSONOBJ, BASE })
    return request
}

const fetchCityWithoutOrder = async (key = token) => {
    const URL = '/SystemService.svc/InitCityPost'
}
