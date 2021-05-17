import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const checkProfile = () => {
    const { profile, token } = localStorage
    const history = useHistory()
    return useEffect(() => {
        if (!profile || !token) {
            history.push('/Login')
        }
    }, [profile, token])
}
