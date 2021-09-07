import { CommonActionTypes } from './commonActionTypes'

export const switchLanguage = () => ({
    type: CommonActionTypes.SWITCH_LANGUAGE,
})

export const actionDispatch = (dispatch: Function) => ({
    switchLanguage: () => dispatch(switchLanguage()),
})
