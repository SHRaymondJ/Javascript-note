import { useHistory } from 'react-router-dom'
import { fetchProfile } from '../services/profileAPI'

const _fetchProfile = async (history) => {
    const { token } = localStorage
    const response = await fetchProfile(JSON.parse(token))
    console.log(response)
    if (!response) {
        alert('账号过期，请重新登录！')
        history.push('/Login')
    }
}

export const checkProfile = () => {
    const history = useHistory()
    _fetchProfile(history)
}
