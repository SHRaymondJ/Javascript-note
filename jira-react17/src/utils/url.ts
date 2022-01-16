import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
/**
 * 返回 url 路径中，指定键的参数值
 * @param keys
 * @returns
 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
    // useSearchParams 获取 url 路径的参数
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () =>
                keys.reduce((prev, key) => {
                    return { ...prev, [key]: searchParams.get(key) || '' }
                }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]
        ),
        setSearchParam,
    ] as const
}
