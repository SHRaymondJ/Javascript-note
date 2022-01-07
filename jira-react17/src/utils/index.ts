import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key]
            if (isVoid(element)) {
                delete result[key]
            }
        }
    }
    return result
}

export const useMount = (callback: () => void) => {
    return useEffect(
        () => callback(),
        // TODO 依赖项里加上callback会造成无限循环， 这个和useCallback 以及 useMemo 有关系
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 在value和delay的值发生改变的时候执行
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 执行当前effect之前对上一个effect进行清除
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export const useArray = <T>(array: T[]) => {
    const [value, setValue] = useState(array)
    const clear = () => {
        setValue([])
    }
    const removeIndex = (index: number) => {
        if (index >= value.length) return
        const newValue = [...value]
        newValue.splice(index, 1)
        setValue(newValue)
    }
    const add = (object: T) => {
        setValue([...value, object])
    }
    return { value, clear, removeIndex, add }
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin)
