import { Moment } from 'moment'
import ActionTypes from './actionTypes'

interface HotelSearchCondition {
    destination: string
    checkIn: Moment
    checkOut: Moment
    hotelAddress: string
    keyWords: string
}

const setHotelSearchConditions = (
    hotelSearchConditions: HotelSearchCondition
) => ({
    type: ActionTypes.SET_HOTEL_SEARCH_CONDITIONS,
    payload: hotelSearchConditions,
})
const setHotelDestination = (destination: string) => ({
    type: ActionTypes.SET_HOTEL_DESTINATION,
    payload: destination,
})
const setHotelCheckIn = (checkIn: Moment) => ({
    type: ActionTypes.SET_HOTEL_CHECKIN,
    payload: checkIn,
})
const setHotelCheckOut = (checkOut: Moment) => ({
    type: ActionTypes.SET_HOTEL_CHECKOUT,
    payload: checkOut,
})
const setHotelCheckInAndOut = ([checkIn, checkOut]: [Moment, Moment]) => ({
    type: ActionTypes.SET_HOTEL_CHECKINANDOUT,
    payload: { checkIn, checkOut },
})
const setHotelAddress = (hotelAddress: string) => ({
    type: ActionTypes.SET_HOTEL_HOTELADDRESS,
    payload: hotelAddress,
})
const setHotelKeyWords = (keyWords: string) => ({
    type: ActionTypes.SET_HOTEL_KEYWORDS,
    payload: keyWords,
})

export const actionDispatch = (dispatch: Function) => ({
    setHotelSearchConditions: (hotelSearchConditions: HotelSearchCondition) =>
        dispatch(setHotelSearchConditions(hotelSearchConditions)),
    setHotelDestination: (destination: string) =>
        dispatch(setHotelDestination(destination)),
    setHotelCheckIn: (checkIn: Moment) => dispatch(setHotelCheckIn(checkIn)),
    setHotelCheckOut: (checkOut: Moment) =>
        dispatch(setHotelCheckOut(checkOut)),
    setHotelAddress: (hotelAddress: string) =>
        dispatch(setHotelAddress(hotelAddress)),
    setHotelKeyWords: (keyWords: string) =>
        dispatch(setHotelKeyWords(keyWords)),
    setHotelCheckInAndOut: (checkDates: [Moment, Moment]) =>
        dispatch(setHotelCheckInAndOut(checkDates)),
})
