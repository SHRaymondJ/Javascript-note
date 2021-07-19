import React from 'react'
import './css/HotelComponent.scss'

const HotelComponent = () => {
    return (
        <div className="hotelLi">
            <div className="hotelLi_main">
                <section className="hotelLiImg">
                    <img
                        src="http://pavo.elongstatic.com/i/Hotel120_120/0000jBiN.jpg"
                        alt="上海青松城大酒店"
                    />
                </section>
                <section className="hotelLi_details">
                    <div className="hotelLiName">
                        <span className="hotelLiName_title">
                            上海青松城大酒店
                        </span>
                        <span className="list_points">+10 分</span>
                    </div>
                    <div className="hotelLiStar" style={{ width: '56px' }}>
                        <div
                            className="hotelLiStarHalf"
                            style={{ display: 'none' }}
                        ></div>
                    </div>
                    <div className="hotelLi_protocals">
                        <div className="companyPay companyPay-companyPay">
                            undefined
                        </div>
                        <div className="companyPay companyPay-mostPreferred">
                            公司优选
                        </div>
                        <div className="companyPay  companyPay-corporate">
                            协议酒店
                        </div>
                    </div>
                    <div className="hotelLiInfo">
                        <div className="hotelLiDistance hide">
                            距离目的地 null公里
                        </div>
                        <div className="hotelLiAddress">
                            上海市徐汇区东安路8号（徐家汇地区 肇嘉浜路口）
                        </div>
                        <div className="hotelLiTelephone">021-64433888</div>
                    </div>
                    <div className="eTravel_grade">
                        <span className="eTravel_Score hide">0</span>
                        <span className="eTravel_Grade"></span>
                    </div>
                </section>
            </div>
            <div className="hotelLi_aside">
                <div className="hotelLiPrice">
                    <p>
                        <b className="hotelLiPrice_price">350</b>CNY 起
                    </p>
                    <p className="hotelLiPrice_tax ">不含税</p>
                </div>
                <div className="searchHotelDetailBtn">查看详情</div>
            </div>
        </div>
    )
}

export default HotelComponent
