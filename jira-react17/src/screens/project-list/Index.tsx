import React, { useState, useEffect } from 'react'
import SearchPanel from './SearchPanel'
import List from './ListModel'
import { cleanObject, useMount, useDebounce } from 'utils'
import qs from 'qs'

export interface User {
    id: number
    name: string
    token: string
}
export interface Project {
    id: number
    name: string
    personId: number
    organization: string
    created: number
}

const Index = () => {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const debouncedParam = useDebounce(param, 2000)
    const apiURL = process.env.REACT_APP_API_URL
    useEffect(() => {
        fetch(
            `${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`
        ).then(async (response) => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [apiURL, debouncedParam])

    useMount(() => {
        fetch(`${apiURL}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    )
}

export default Index
