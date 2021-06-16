import { createSelector } from 'reselect'

const commonState = (state: any) => state.common

export const commonSelector = createSelector(commonState, (common) => ({
    ...common,
}))
