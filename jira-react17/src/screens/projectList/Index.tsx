import React, { useState } from 'react'
import SearchPanel from './SearchPanel'
import List from './ListModel'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'

export interface User {
    id: number
    name: string
    token: string
}
export interface Project {
    id: number
    name: string
    personId: string
    organization: string
    created: number
}

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const debouncedParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            {error ? (
                <Typography.Text type={'danger'}>
                    {error.message}
                </Typography.Text>
            ) : null}
            <List
                dataSource={list || []}
                users={users || []}
                loading={isLoading}
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
