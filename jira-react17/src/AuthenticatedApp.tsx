import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { Row } from 'components/libs'
import { useAuth } from 'context/AuthContext'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { ProjectListScreen } from 'screens/projectList/Index'
import { ProjectScreen } from 'screens/projects/Index'

export const AuthenticatedApp = () => {
    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route
                            path={'/projects'}
                            element={<ProjectListScreen />}
                        />
                        <Route
                            path={'/projects/:projectId/*'}
                            element={<ProjectScreen />}
                        />
                    </Routes>
                </Main>
            </Router>
        </Container>
    )
}

const PageHeader = () => {
    const { user, logout } = useAuth()

    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                <Link to={'/projects'}>项目</Link>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* <Button onClick={logout} type="default"> */}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <Button type={'link'} onClick={logout}>
                                    登出
                                </Button>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button type={'link'} onClick={(e) => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
                {/* </Button> */}
            </HeaderRight>
        </Header>
    )
}

const Container = styled.div`
    width: 100%;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
    grid-area: main;
`
