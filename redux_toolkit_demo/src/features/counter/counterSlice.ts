import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { fetchCount } from './counterAPI'

export interface CounterState {
    value: number
    status: 'idle' | 'loading' | 'failed'
    name: string
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
    name: 'Raymond',
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return response.data
    }
)

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        modifyName: (state, action: PayloadAction<{ userName: string }>) => {
            console.log(action.payload)
            state.name = action.payload.userName
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value += action.payload
            })
    },
})

export const { increment, decrement, incrementByAmount, modifyName } =
    counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export const selectName = (state: RootState) => state.counter

export const incrementIfOdd =
    (amount: number): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState())
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount))
        }
    }

export default counterSlice.reducer
