import { ActionTypes } from './actionTypes'

export const toggleRememberPassword = () => ({
    type: ActionTypes.TOGGLE_REMEMBER_USERNAME,
})

export const setCompanyName = (companyName: string) => ({
    type: ActionTypes.SET_COMPANYNAME,
    payload: companyName,
})

export const setUserName = (userName: string) => ({
    type: ActionTypes.SET_USERNAME,
    payload: userName,
})

export const setPassword = (password: string) => ({
    type: ActionTypes.SET_PASSWORD,
    payload: password,
})

export const clearUser = () => ({
    type: ActionTypes.CLEAR_USER,
})
