import { fetchCity } from '../services/cityAPI'

export const getCity = async () => {
    const result = await fetchCity()
    console.log(result)
}
