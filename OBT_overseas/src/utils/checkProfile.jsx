import { useHistory } from 'react-router-dom'
import { fetchProfile } from '../services/profileAPI'

const _jumpToLoginPage = (history) => {
    console.log(123)
  alert('账号过期，请重新登录！')
  history.push('/Login')
}

const _fetchProfile = async (history) => {
  const { token } = localStorage
  if (!token) {
    _jumpToLoginPage(history)
  } else {
    const response = await fetchProfile(JSON.parse(token))
    console.log(response)
    if (!response) {
      _jumpToLoginPage(history)
    }
  }
}

export const checkProfile = () => {
  const history = useHistory()
  _fetchProfile(history)
}
