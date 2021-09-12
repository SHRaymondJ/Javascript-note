import { CommonActionTypes } from './commonActionTypes'
import type { Dispatch } from 'react'

export const switchLanguage = () => ({
    type: CommonActionTypes.SWITCH_LANGUAGE,
})

export const actionDispatch = (dispatch:Dispatch<any> ) => ({
    switchLanguage: () => dispatch(switchLanguage()),
})
