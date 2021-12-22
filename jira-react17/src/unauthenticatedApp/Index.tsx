/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { LoginComponent } from './Login'
import { RegisterComponent } from './Register'
import { Card, Divider, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useAsync } from 'utils/useAsync'
import { useDocumentTitle } from 'utils'

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const { error, setError } = useAsync()

    useDocumentTitle('请登录或注册', false)

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Header />
            <Background />
            <ShadowCard>
                {isRegister ? <h2>请注册</h2> : <h2>请登录</h2>}
                {error ? (
                    <Typography.Text type={'danger'}>
                        {error.message}
                    </Typography.Text>
                ) : null}
                {isRegister ? (
                    <RegisterComponent onError={setError} />
                ) : (
                    <LoginComponent onError={setError} />
                )}
                <Divider />
                <a onClick={() => setIsRegister(!isRegister)}>{`${
                    isRegister
                        ? '已经有账号了？直接登录'
                        : '没有账号？注册新账号'
                }`}</a>
            </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
        calc(((100vw - 40rem) / 2) - 3.2rem), cover;
    background-image: url(${left}), url(${right});
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`
