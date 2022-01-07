import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { Project, User } from './Index'

interface ListProps extends TableProps<Project>{
    users: User[]
}

const List = ({ users, ...props }: ListProps) => {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            rowKey: 'name',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
            render(value: any, project: Project) {
                return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            }
        },
        {
            title: '小组',
            dataIndex: 'organization',
            rowKey: 'organization',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
        },
        {
            title: '负责人',
            rowKey: '负责人',
            render(value: any, project: Project) {
                return (
                    <span>
                        {
                            users.find((user) => user.id === Number(project.personId))
                                ?.name
                        }
                    </span>
                )
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            rowKey: 'created',
            sorter: (a: Project, b: Project) => a.created - b.created,
            render(value: any, project: Project) {
                return (
                    <span>
                        {project.created
                            ? dayjs(project.created).format('YYYY-MM-DD')
                            : '无'}
                    </span>
                )
            },
        },
    ]
    return (
        <Table
            pagination={false}
            columns={columns}
            rowKey={(record) => record.id}
            {...props}
        />
    )
}

export default List
