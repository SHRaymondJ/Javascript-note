import React, { useState } from 'react'
import SearchPanel from './SearchPanel'
import List from './ListModel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import { useUrlQueryParams } from 'utils/url'
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
    // 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝对不能放到依赖里
    const [, setParam] = useState({
        name: '',
        personId: '',
    })

    const [param] = useUrlQueryParams(['name', 'personId'])
    const debouncedParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)

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

ProjectListScreen.WhyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`
