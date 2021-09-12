import React from 'react'
import { useHistory } from 'react-router-dom'
import { fetchProfile } from '../services/profileAPI'
import type { History } from 'history'

const jumpToLoginPage = (history: History) => {
    alert('账号过期，请重新登录！')
    history.push('/Login')
}

export const useCheckProfile = async () => {
    const history = useHistory()
    const { token } = localStorage
    if (!token) {
        jumpToLoginPage(history)
        return
    } else {
        const response = await fetchProfile(JSON.parse(token))
        if (!response) {
            jumpToLoginPage(history)
        }
    }
}
