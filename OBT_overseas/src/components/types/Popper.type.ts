export interface IPopperProps {
    button: JSX
    showArrow?: boolean
    offsetProp?: number
    placementProp?:
        | 'bottom-start'
        | 'bottom'
        | 'bottom-end'
        | 'left-start'
        | 'left'
        | 'left-end'
        | 'top-start'
        | 'top'
        | 'top-end'
        | 'right-start'
        | 'right'
        | 'right-end'
    children: any
}
