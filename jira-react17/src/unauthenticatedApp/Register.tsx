import styled from '@emotion/styled'
import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/AuthContext'
import { useAsync } from 'utils/useAsync'

export const RegisterComponent = ({onError} : {onError: (error: Error) => void}) => {
    const { register } = useAuth()
    const {isLoading, run} = useAsync(undefined, {throwOnError: true})
    const handleSubmit = async ({cpassword, ...value}: {
        username: string
        password: string
        cpassword: string
    }) => {
        if(cpassword !== value.password) {
            onError(new Error('请确认两次输入的密码'))
            return
        }
        try {
            await run(register(value))
        } catch (error) {
            onError(error as Error)
        }
    }

    return (
        <Form onFinish={handleSubmit} labelCol={{ span: 8 }}>
            <Form.Item
                name={'username'}
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input placeholder={'请输入用户名'} />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input placeholder={'请输入密码'} />
            </Form.Item>
            <Form.Item
                name={'cpassword'}
                rules={[{ required: true, message: '请确认密码' }]}
            >
                <Input placeholder={'请确认密码'} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}

const LongButton = styled(Button)`
    width: 100%;
`