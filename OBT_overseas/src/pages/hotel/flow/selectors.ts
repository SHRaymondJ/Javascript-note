import { createSelector } from 'reselect'

const hotelState = (state) => state.hotelPage

export const hotelSelector = createSelector(hotelState, (hotelPage) => ({
    ...hotelPage,
}))
