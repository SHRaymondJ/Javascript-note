import { createSelector } from 'reselect'
import { ICommonReducer } from './commonReducers'
import type { Selector } from 'reselect'

const commonState:Selector<ICommonReducer, ICommonReducer> = (state:any) => state.common

export const commonSelector = createSelector(commonState, (common) => ({
    ...common,
}))
