import { CommonActionTypes } from './commonActionTypes'

export interface ICommonReducer {
    language: 'CN' | 'EN'
}

const defaultState: ICommonReducer = {
    language: 'CN',
}

const commonReducers = (state = defaultState, action: any) => {
    switch (action.type) {
        case CommonActionTypes.SWITCH_LANGUAGE: {
            const language = state.language === 'CN' ? 'EN' : 'CN'
            return { ...state, language }
        }
        default:
            return state
    }
}

export default commonReducers
