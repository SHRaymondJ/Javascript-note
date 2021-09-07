import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { actionDispatch } from '../../pages/home/flow/actions'
import { actionDispatch as commonActionDispatch } from '../../commonActions'
import { useDispatch, useSelector } from 'react-redux'
import { homePageSelector } from '../../pages/home/flow/selectors'

import './header.scss'
import BCDLOGO from '../../assets/logoImgBCD.png'
import HOTELACTIVE from '../../assets/icon/icon_home_hotel-active.png'
import HOTEL from '../../assets/icon/icon_home_hotel.png'
import RAILACTIVE from '../../assets/icon/icon_home_rail-active.png'
import RAIL from '../../assets/icon/icon_home_rail.png'
import AIRACTIVE from '../../assets/icon/icon_home_air-active.png'
import AIR from '../../assets/icon/icon_home_air.png'
import PROFILE from '../../assets/icon/icon_profile.png'
import MENU from '../../assets/icon/icon_nav_menu.png'
import { commonSelector } from '../../commonSelectors'

const Navigation = styled.nav`
    text-decoration: none;
`
const FlexSpaceBetween = styled.section`
    display: flex;
    justify-content: space-between;
`

const header = memo(() => {
    const { setComponent } = actionDispatch(useDispatch())

    const onComponentClick = (component: string) => {
        setComponent(component)
    }
    const { language } = useSelector(commonSelector)
    const { switchLanguage } = commonActionDispatch(useDispatch())
    const { air, hotel, rail } = useSelector(homePageSelector)

    return (
        <div className="header-wrapper">
            <section className="header-container">
                <FlexSpaceBetween className="header-first-line">
                    <img src={BCDLOGO} alt="bcd" className="header-logo" />
                    <Navigation>
                        <Link to="/points">my points</Link>
                        <Link to="/contact">contact service team</Link>
                        <span
                            className="header-language"
                            onClick={switchLanguage}
                        >
                            australian
                        </span>
                        <Link to="/login">logout</Link>
                    </Navigation>
                </FlexSpaceBetween>
                <FlexSpaceBetween className="header-second-line">
                    <Navigation className="header-second-line-left">
                        <Link to="/search/air" onClick={() => onComponentClick('air')} className={air? 'active' : ''}>
                            <img src={air ? AIRACTIVE : AIR} alt="air" />
                            air
                        </Link>
                        <Link
                            to="/search/hotel"
                            onClick={() => onComponentClick('hotel')}
                            className={hotel? 'active' : ''}
                        >
                            <img
                                src={hotel ? HOTELACTIVE : HOTEL}
                                alt="hotel"
                            />
                            hotel
                        </Link>
                        <Link
                            to="/search/rail"
                            onClick={() => onComponentClick('rail')}
                            className={rail? 'active' : ''}
                        >
                            <img src={rail ? RAILACTIVE : RAIL} alt="rail" />
                            rail
                        </Link>
                    </Navigation>
                    <Navigation className="header-second-line-right">
                        <Link to="/air">
                            profile <img src={PROFILE} alt="profile" />
                        </Link>
                        <Link to="/hotel">
                            menu
                            <img src={MENU} alt="menu" />
                        </Link>
                    </Navigation>
                </FlexSpaceBetween>
            </section>
        </div>
    )
})

export default header
