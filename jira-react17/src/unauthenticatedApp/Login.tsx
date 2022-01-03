import { useAuth } from 'context/AuthContext'
import { Button, Form, Input } from 'antd'
import { useAsync } from 'utils/useAsync'
import styled from '@emotion/styled'

export const LoginComponent = ({onError} : {onError: (error: Error) => void}) => {
    const { login } = useAuth()
    const {isLoading, run} = useAsync(undefined, {throwOnError: true})

    const handleSubmit = async (value: {
        username: string
        password: string
    }) => {
        try {
            await run(login(value))
                .catch(err => onError(err))
                // 因为 login 方法已经 catch 了 Promise 的报错，所以如果不在catch里重新return Promise.reject(err) 的话，这边的 .catch 是接收不到报错的
        } catch (error) {
            onError(error as Error)
        }
    }

    return (
        <Form onFinish={handleSubmit} labelCol={{ span: 8 }}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请填写用户名' }]}
            >
                <Input placeholder={'请填写用户名'} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请填写密码' }]}
            >
                <Input placeholder={'请填写密码'} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} type={'primary'} htmlType="submit">
                    登陆
                </LongButton>
            </Form.Item>
        </Form>
    )
}

const LongButton = styled(Button)`
    width: 100%;
`