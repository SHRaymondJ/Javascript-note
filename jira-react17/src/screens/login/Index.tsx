import { useAuth } from 'context/AuthContext'
import React, { FormEvent } from 'react'

const Index = () => {
    const { user, login } = useAuth()
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget[0] as HTMLInputElement).value
        const password = (event.currentTarget[1] as HTMLInputElement).value
        login({ username, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {user && (
                    <span>{`name: ${user?.name} token: ${user?.token}`}</span>
                )}
            </div>
            <div>
                <label htmlFor="userName">User name: </label>
                <input type="text" id={'userName'} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" id={'password'} />
            </div>
            <input type="submit" value={'Login'} />
        </form>
    )
}

export default Index
