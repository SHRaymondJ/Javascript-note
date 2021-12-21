import { Form, Input, Select } from 'antd'
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
        <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
            <Form.Item>
                <Input
                    placeholder="项目名"
                    type="text"
                    value={param.name}
                    onChange={(evt) =>
                        setParam({
                            ...param,
                            name: evt.currentTarget.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value="">负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option value={user.id} key={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel