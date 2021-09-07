import { IAction } from '../../../global/types'
import { ActionTypes } from './actionTypes'

interface DefaultState {
    type: string
    data: {
        rememberUsername: boolean
        companyName: string
        userName: string
        password: string
    }
}
const defaultState = {
    rememberUsername: true,
    companyName: '',
    userName: '',
    password: '',
}

const loginReducer = (state = defaultState, action: any) => {
    if (action.type === ActionTypes.TOGGLE_REMEMBER_USERNAME) {
        return { ...state, rememberUsername: !state.rememberUsername }
    }
    if (action.type === ActionTypes.SET_USERNAME) {
        return { ...state, userName: action.payload }
    }
    if (action.type === ActionTypes.SET_PASSWORD) {
        return { ...state, password: action.payload }
    }
    if (action.type === ActionTypes.SET_COMPANYNAME) {
        return { ...state, companyName: action.payload }
    }
    if (action.type === ActionTypes.CLEAR_USER) {
        return { ...state, companyName: '', userName: '', password: '' }
    }
    return state
}

export default loginReducer
