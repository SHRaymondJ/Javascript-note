import { createSelector } from 'reselect'

const homePageState = (state: any) => state.homePage

export const homePageSelector = createSelector(homePageState, (homePage) => ({
    ...homePage,
}))
