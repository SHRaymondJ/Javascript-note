import AxiosPost from './AxiosPost'

let initCityURL = '/SystemService.svc/InitCityPost'
// const TANumber = localStorage.getItem('TANumber') || ''
// const token = localStorage.getItem('token')
const { token, TANumber } = localStorage
const key = JSON.parse(token)
let initCityJSON: { key: string; travelRequestNo?: string } = { key }

if (TANumber && localStorage.getItem('TAOneCity') != '1') {
    initCityURL = '/SystemService.svc/InitLimitCitys'
    initCityJSON = { key, travelRequestNo: TANumber }
}

const fetchCity = async () => {
    const city = await AxiosPost({
        URL: initCityURL,
        JSONOBJ: initCityJSON,
        BASE: localStorage.BASE,
    })
    return city
}

export { fetchCity }
