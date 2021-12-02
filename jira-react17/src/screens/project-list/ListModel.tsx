import React from 'react'
import { Project, User } from './Index'

interface ListProps {
    list: Project[]
    users: User[]
}

const List = ({ list, users }: ListProps) => {
    return (
        <form>
            <table>
                <thead>
                    <tr>
                        <td>名称</td>
                        <td>负责人</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>
                                {
                                    users.find(
                                        (user) => user.id === project.personId
                                    )?.name
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    )
}

export default List
