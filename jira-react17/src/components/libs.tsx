import styled from '@emotion/styled'

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