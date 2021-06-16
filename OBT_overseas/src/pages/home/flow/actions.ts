import { HomeActionTypes } from './actionTypes'

export const setComponent = (componentName: string) => ({
    type: HomeActionTypes.SET_COMPONENTS,
    payload: componentName,
})

export const actionDispatch = (dispatch: Function) => ({
    setComponent: (component: string) => dispatch(setComponent(component)),
})
