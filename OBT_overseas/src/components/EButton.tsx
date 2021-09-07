import React from 'react'
import styled from 'styled-components'

const OrangeButton = styled.button`
    border: none;
    outline: none;
    background-color: #ff6720;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 2px;
    padding: 0 8px;
    line-height: 36px;
    min-height: 36px;
    min-width: 120px;
    text-align: center;
    &:hover {
        background-color: #ff9e1b;
    }
`

const EButton = ({ children, style, type='' }: { children: string; style: object }) => {
    return <OrangeButton style={style} type={type}>{children}</OrangeButton>
}

export default EButton
