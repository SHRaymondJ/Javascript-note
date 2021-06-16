import { HomeActionTypes } from './actionTypes'

const defaultState = {
    air: false,
    hotel: false,
    rail: false,
}

const homePageReducer = (
    state = defaultState,
    action: { type: string; payload: string }
) => {
    switch (action.type) {
        case HomeActionTypes.SET_COMPONENTS: {
            for (let key in state) {
                state[key] = false
            }
            state[action.payload] = true
            return { ...state }
        }
        default:
            return state
    }
}

export default homePageReducer
