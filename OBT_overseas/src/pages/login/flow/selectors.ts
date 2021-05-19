import { createSelector } from 'reselect'

const loginPageState = (state: any) => state.loginPage

export const loginPageSelector = createSelector(
    loginPageState,
    (loginPage) => ({
        ...loginPage,
    })
)
