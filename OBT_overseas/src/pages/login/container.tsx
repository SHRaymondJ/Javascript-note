import { createSelector } from 'reselect'

const defaultState = {
    profile: {AirCards:['111']},
}

const loginPageState = (state: any) => state.loginPage

const makeSelectProfile = createSelector(
    loginPageState,
    (loginPage) => loginPage.profile
)
export const profileSelector = createSelector(makeSelectProfile, (profile) => ({
    profile,
}))

export const setProfile = (profile: any): any => ({
    type: 'SET_PROFILE',
    payload: profile,
})

export default function loginReducer(
    state = defaultState,
    action = { type: '', payload: {} }
) {
    switch (action.type) {
        case 'SET_PROFILE': {
            return { ...state, profile: { ...action.payload } }
        }
        default:
            return state
    }
}
