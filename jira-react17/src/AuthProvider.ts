import { http } from './utils/http'
import { User } from 'screens/projectList/Index'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data: { username: string; password: string }) => {
    return http('login', { data, method: 'POST' }).then(handleUserResponse)
}

export const register = (data: { username: string; password: string }) => {
    return http('register', { data, method: 'POST' }).then(handleUserResponse)
}

export const logout = async () =>
    window.localStorage.removeItem(localStorageKey)

    