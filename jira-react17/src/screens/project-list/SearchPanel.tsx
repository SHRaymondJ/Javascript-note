import React from 'react'
import { User } from './Index'

interface SearchPanelProps {
    param: {
        name: string
        personId: string
    }
    users: User[]
    setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
    return (
        <div>
            <input
                type="text"
                value={param.name}
                onChange={(evt) =>
                    setParam({
                        ...param,
                        name: evt.target.value,
                    })
                }
            />
            <select
                value={param.personId}
                onChange={(evt) =>
                    setParam({
                        ...param,
                        personId: evt.target.value,
                    })
                }
            >
                <option value="">负责人</option>
                {users.map((user) => (
                    <option value={user.id} key={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SearchPanel
