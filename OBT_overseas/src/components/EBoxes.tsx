import React from 'react'
import styled from 'styled-components'

const Reminder = styled.div`
    background-color: #ebf4ff;
    border-left: 2px solid #5b89c8;
    color: #111c4e;
    display: flex;
    align-items: center;
    padding-left: 22px;
    margin-bottom: 12px;
    font-size: 14px;
    min-height: 48px;
`
const WhiteBox = styled.div`
    padding: 24px;
    background-color: #FFF;
    margin-bottom: 12px;
`

export const ReminderBox = ({ children }) => {
    return <Reminder>{children}</Reminder>
}


export const EBox = ({ className="", children }) => {
    return <WhiteBox className={className}>{children}</WhiteBox>
}