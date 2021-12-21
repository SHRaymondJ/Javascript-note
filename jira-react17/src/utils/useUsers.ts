import { useAsync } from 'utils/useAsync'
import { User } from 'screens/projectList/Index'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useEffect } from 'react'

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()
    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}
