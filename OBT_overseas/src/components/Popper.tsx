import React, { useState, useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import OutsideClickHandler from 'react-outside-click-handler'
import './css/Popper.scss'
import { IPopperProps } from './types/Popper.type'

export const DefaultButton = (props) => {
    return (
        <span className="dots" {...props}>
            ...
        </span>
    )
}

const Popper = ({
    button: Button = DefaultButton,
    showArrow = true,
    offsetProp = 10,
    placementProp = 'bottom-start',
    children,
}: IPopperProps) => {
    const [visible, setVisible] = useState(false)
    const referenceRef = useRef(null)
    const popperRef = useRef(null)
    const [offset, setOffset] = useState(offsetProp)

    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: placementProp,
            modifiers: [
                {
                    name: 'offset',
                    enabled: true,
                    options: {
                        offset: [0, offset],
                    },
                },
            ],
        }
    )

    const hide = () => setVisible(false)

    const handleDropdownClick = (e: any) => {
        e.preventDefault()
        setVisible(!visible)
    }
    useEffect(() => {
        const newOffset = visible ? offsetProp : offsetProp - 5
        setOffset(newOffset)
    }, [visible])

    const containerStyle: any = {
        ...styles.popper,
        zIndex: visible ? 999 : -1,
        opacity: visible ? 1 : 0,
        // transform: `translateY(${offset}px)`,
    }

    const arrowStyle: any = {
        display: showArrow ? 'display' : 'none',
    }

    return (
        <OutsideClickHandler onOutsideClick={hide}>
            <div
                className="button"
                ref={referenceRef}
                onClick={handleDropdownClick}
                aria-describedby="tooltip"
            >
                <Button visible={visible} />
            </div>
            <div
                id="tooltip"
                ref={popperRef}
                style={containerStyle}
                role="tooltip"
                {...attributes.popper}
            >
                {children}
                <div id="arrow" data-popper-arrow style={arrowStyle}></div>
            </div>
        </OutsideClickHandler>
    )
}

export default Popper
