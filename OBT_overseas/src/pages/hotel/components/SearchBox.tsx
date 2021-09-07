import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Moment } from 'moment'
import EButton from '../../../components/EButton'
import { RangePickerAntd } from '../../../components/DatePickerAntd'
import { hotelSelector } from '../flow/selectors'
import { actionDispatch } from '../flow/actions'
import ICONPRICE from '../../../assets/hotel/icon_price.png'
import ICONSTAR from '../../../assets/hotel/icon_star.png'
import '../../../assets/css/base.scss'
import './css/SearchBox.scss'
import Popper from '../../../components/Popper'
import { commonSelector } from '../../../commonSelectors'
import dictionary from './dictionary/SearchBox'
import { useEffect } from 'react'
import { getCity } from '../../../components/ECity'

const defaultPriceRange = [
    [0, 5000],
    [0, 150],
    [151, 300],
    [301, 450],
    [451, 600],
    [601, 1000],
    [1001, 5000],
]

const defaultStarRange = ['1-2-3-4-5', '1-2', '3', '4', '5']
const SearchBox = () => {
    const { searchConditions } = useSelector(hotelSelector)
    const { language } = useSelector(commonSelector)
    const [dic, setDic] = useState(dictionary[language])

    const {
        setHotelDestination,
        setHotelAddress,
        setHotelKeyWords,
        setHotelCheckInAndOut,
    } = actionDispatch(useDispatch())
    const { destination, checkIn, checkOut, hotelAddress, keyWords } =
        searchConditions
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
    }
    const setHotelCheckDate = (dates: [Moment, Moment]) => {
        setHotelCheckInAndOut(dates)
    }
    const PriceButton = ({ visible }: { visible: boolean }) => {
        return (
            <div className={`search_price_title ${visible ? 'active' : ''}`}>
                <img src={ICONPRICE} alt="price" />
                <span className="search_price_text">151-300CNY</span>
            </div>
        )
    }
    const StarButton = ({ visible }: { visible: boolean }) => {
        return (
            <div className={`search_level_title ${visible ? 'active' : ''}`}>
                <img src={ICONSTAR} alt="level" />
                <span className="search_level_text">{dic.allTxt}</span>
            </div>
        )
    }

    const handleSearchInputChange = (
        fn: Function,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (fn) {
            fn(e.currentTarget.value)
        }
    }

    useEffect(() => {
        setDic(dictionary[language])
    }, [language])
    return (
        <form className="search_wrapper" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="search_inputItems">
                <div className="search_destination">
                    <h6 className="search_title">{dic.destinationTxt}</h6>
                    <input
                        type="text"
                        className="search_input"
                        value={destination}
                        onChange={(e) =>
                            handleSearchInputChange(setHotelDestination, e)
                        }
                        onFocus={getCity}
                    />
                </div>
                <div className="search_checkBox">
                    <div className="search_checkBox_title">
                        <h6 className="search_title">{dic.checkInTxt}</h6>
                        <h6 className="search_title">{dic.checkOutTxt}</h6>
                    </div>
                    <RangePickerAntd
                        defaultValue={[checkIn, checkOut]}
                        placeholder={['check-in', 'check-out']}
                        onChange={(dates) => setHotelCheckDate(dates)}
                        className="search_input"
                        allowClear={false}
                    ></RangePickerAntd>
                </div>
                <div className="search_hotelAddress">
                    <h6 className="search_title">{dic.hotelAddressTxt}</h6>
                    <div className="hotelAddressBody">
                        <input
                            type="text"
                            className="search_input"
                            value={hotelAddress}
                            onChange={(e) =>
                                handleSearchInputChange(setHotelAddress, e)
                            }
                        />
                    </div>
                </div>
                <div className="search_keyWords">
                    <h6 className="search_title">{dic.keyWordsTxt}</h6>
                    <div className="search_keywords_box">
                        <input
                            type="text"
                            className="search_input"
                            value={keyWords}
                            onChange={(e) =>
                                handleSearchInputChange(setHotelKeyWords, e)
                            }
                        />
                        <div className="keyWordBody"></div>
                    </div>
                </div>
            </div>
            <div className="search_buttonItems">
                <div className="search_items">
                    <div className="search_price">
                        <Popper
                            button={PriceButton}
                            offsetProp={0}
                            showArrow={false}
                        >
                            <div className="searchBody">
                                {defaultPriceRange.map((range, index) => {
                                    const text =
                                        index === 0
                                            ? 'All'
                                            : `${range[0]}-${range[1]}CNY`
                                    return (
                                        <div
                                            className="hotelPriceBtn"
                                            key={index}
                                        >
                                            {text}
                                        </div>
                                    )
                                })}
                                <div className="hotel_price_range">
                                    <input
                                        type="text"
                                        className="searchMinPrice"
                                        value="0"
                                        onChange={(e) =>
                                            handleSearchInputChange(
                                                setHotelKeyWords,
                                                e
                                            )
                                        }
                                    />
                                    <div className="hyphen">-</div>
                                    <input
                                        type="text"
                                        className="searchMaxPrice"
                                        value="700"
                                        onChange={(e) =>
                                            handleSearchInputChange(
                                                setHotelKeyWords,
                                                e
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </Popper>
                    </div>
                    <div className="search_level">
                        <Popper
                            button={StarButton}
                            offsetProp={0}
                            showArrow={false}
                        >
                            {
                                <div className="searchBody">
                                    {defaultStarRange.map((range, index) => {
                                        return (
                                            <div
                                                className="hotelStarBtn"
                                                key={index}
                                            >
                                                <span className="level">
                                                    {range}
                                                </span>
                                                <span className="star"></span>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </Popper>
                    </div>
                </div>
                <EButton style={{ width: '120px' }}>{dic.searchTxt}</EButton>
            </div>
        </form>
    )
}

export default SearchBox
