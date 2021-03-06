import React from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
    React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
    { error: Error | null }
> {
    state = { error: null }

    // 当子组件抛出异常，这里会接收并调用
    static getDerivedStateFromError = (error: Error) => {
        return {error}
    }

    render(){
        const {error} = this.state
        const {children, fallbackRender} = this.props

        if(error) {
            return fallbackRender({error})
        }

        return children
    }
}
