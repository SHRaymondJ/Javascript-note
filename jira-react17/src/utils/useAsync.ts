import { useState } from 'react'

interface State<D = null> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    error: null,
    data: null,
}

const defaultThrowOnError = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialThrowOnError?: typeof defaultThrowOnError) => {
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState,
    })

    const setData = (data: D) => {
        setState({
            data,
            stat: 'success',
            error: null,
        })
    }

    const setError = (error: Error) => {
        setState({
            error,
            stat: 'error',
            data: null,
        })
    }

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({ ...state, stat: 'loading' })
        return promise
            .then((data) => {
                setData(data)
                return data
            })
            .catch((error) => {
                setError(error)
                if(initialThrowOnError?.throwOnError) return Promise.reject(error)
                return error
            })
    }

    return {
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isIdle: state.stat === 'idle',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        run,
        ...state
    }
}
