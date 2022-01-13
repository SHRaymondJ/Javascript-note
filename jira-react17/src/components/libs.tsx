import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
// import { DevTools } from 'jira-dev-tool'

export const Row = styled.div<{
    gap?: number | boolean
    between?: boolean
    marginBottom?: number
}>`
    display: flex;
    justify-content: ${(props) =>
        props.between ? 'space-between' : undefined};
    align-items: center;
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom + 'rem' : undefined};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${(props) =>
            typeof props.gap === 'number'
                ? props.gap + 'rem'
                : props.gap
                ? '2rem'
                : undefined};
    }
`

export const FullPageLoading = () => {
    return (
        <FullPageContainer>
            <Spin size={'large'} />
        </FullPageContainer>
    )
}

const FullPageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <FullPageContainer>
            {/* <DevTools /> */}
            <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
        </FullPageContainer>
    )
}
