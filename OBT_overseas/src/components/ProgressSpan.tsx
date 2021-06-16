import React from 'react'
import styled from 'styled-components'

interface TypeOfProgressSpan {
    active: string
    text: string
}

const ProgressLine = styled.hr`
    width: 304px;
    height: 1px;
    margin-top: 24px;
    background-color: #9b9b9b;
    border: none;
    &.active {
        background: #0075ff;
    }
`
const ProgressStep = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #9b9b9b;
    &.active {
        color: #0075ff;
    }
`

const ProgressSpan = ({ active, text }: TypeOfProgressSpan) => {
    return (
        <>
            <ProgressLine className={active} />
            <ProgressStep className={active}>{text}</ProgressStep>
        </>
    )
}

export default ProgressSpan
