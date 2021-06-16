import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { commonSelector } from '../commonSelectors'
import ProgressSpan from './ProgressSpan'

const ProgressContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    line-height: 50px;
`

const DICTIONARY = {
    CN: {
        search: '查询',
        book: '预订',
        complete: '完成',
    },
    EN: {
        search: 'search',
        book: 'book',
        complete: 'complete',
    },
}

interface ArgumentsTypeProgressBar {
    step: number
}

const ProgressBar = memo(({ step }: ArgumentsTypeProgressBar) => {
    const { language } = useSelector(commonSelector)
    const [text, setText] = useState(DICTIONARY[language])
    useEffect(() => {
        const newText = DICTIONARY[language]
        setText(newText)
    }, [language])
    const { search, book, complete } = text
    return (
        <ProgressContainer>
            <ProgressSpan active="active" text={search}></ProgressSpan>
            <ProgressSpan
                active={step >= 2 ? 'active' : ''}
                text={book}
            ></ProgressSpan>
            <ProgressSpan
                active={step >= 3 ? 'active' : ''}
                text={complete}
            ></ProgressSpan>
        </ProgressContainer>
    )
})

export default ProgressBar
