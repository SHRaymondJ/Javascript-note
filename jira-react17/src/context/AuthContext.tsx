import React, { ReactNode, useContext } from 'react'
import { User } from 'screens/projectList/Index'
import * as auth from 'AuthProvider'
import { http } from 'utils/http'
import { useMount } from 'utils/index'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'

interface AuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<
    | {
          user: User | null
          login: (form: AuthForm) => Promise<void>
          register: (form: AuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<User | null>(null)
    
    const {data: user, isIdle, isLoading, isError, run, setData: setUser, error } = useAsync<User | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        run(bootstrapUser())
    })

    if(isIdle || isLoading) {
        return <FullPageLoading />
    }

    if(isError) {
        return <FullPageErrorFallback error={error}/>
    }
    return (
        <AuthContext.Provider
            value={{ user, login, register, logout }}
            children={children}
        ></AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用')
    }
    return context
}
