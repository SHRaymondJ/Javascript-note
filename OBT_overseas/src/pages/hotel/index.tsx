import React from 'react'
import ProgressBar from '../../components/ProgressBar'
import SearchBox from './components/SearchBox'
import HotelComponent from './components/HotelComponent'
import { ReminderBox, EBox } from '../../components/EBoxes'
import Popper from '../../components/Popper'
import SHOWMAP from '../../assets/hotel/pic_showonmap.png'
import BANNER from '../../assets/hotel/query.png'
import MENU from '../../assets/icon/icon_nav_menu.png'
import './index.scss'

const sortMenu = () => {
    return <img className="hamb_menu_btn" src={MENU} />
}

const index = () => {
    return (
        <div>
            <ProgressBar step={1}></ProgressBar>
            <SearchBox></SearchBox>
            <ReminderBox>
                <span>
                    差旅政策：您做选择的城市酒店预算为<b> 760 </b>CNY
                </span>
            </ReminderBox>
            <section className="wrapper">
                <aside className="aside">
                    <div className="allMapBtn">
                        <img src={SHOWMAP} />
                        <span className="allMapText">查看地图</span>
                    </div>
                </aside>
                <section className="main">
                    <EBox>
                        根据您的需求，共有<b>26</b>家酒店供您选择
                    </EBox>
                    <a href="" className="banner_middle">
                        <img src={BANNER} alt="" />
                    </a>
                    <EBox className="sortBody">
                        <h3>排序：</h3>
                        <div className="sortBody-wrapper">
                            <div className="priceSort-asc sortType">价格由低到高</div>
                            <div className="priceSort-desc sortType">价格由高-低</div>
                            <div className="starSort-asc sortType">星级1星-5星</div>
                            <div className="starSort-desc sortType">星级5星-1星</div>
                        </div>
                        <nav className="hamb_menu">
                            <Popper
                                button={sortMenu}
                                placementProp="bottom-end"
                            >
                                <div className="hamb_menu_wrapper">
                                    <div className="scoreSort-asc sortType">
                                        评分由低-高
                                    </div>
                                    <div className="scoreSort-desc sortType">
                                        评分由高-低
                                    </div>
                                </div>
                            </Popper>
                        </nav>
                    </EBox>
                    <section className="hotelList">
                        <HotelComponent></HotelComponent>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default index
