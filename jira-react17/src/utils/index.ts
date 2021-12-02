import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = <T extends object>(object: T) => {
    const result = { ...object }
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key]
            if (isFalsy(element)) {
                delete result[key]
            }
        }
    }
    return result
}

export const useMount = (callback: () => void) => {
    return useEffect(() => callback(), [])
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
    // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
    const [value, setValue] = useState(array)
    const clear = () => {
        setValue([])
    }
    const removeIndex = (index: number) => {
        if (index >= value.length) return
        const newValue = [...value]
        newValue.splice(index,1)
        setValue(newValue)
    }
    const add = (object: T) => {
        setValue([...value, object])
    }
    return { value, clear, removeIndex, add }
}
