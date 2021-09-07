import moment from 'moment'
import ActionTypes from './actionTypes'

const startDate = new Date()
const endDate = new Date().setDate(startDate.getDate() + 1)

const defaultState = {
    searchConditions: {
        destination: '',
        checkIn: moment(startDate),
        checkOut: moment(endDate),
        hotelAddress: '',
        keyWords: '',
    },
}

const hotelReducers = (state = defaultState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_HOTEL_DESTINATION:
            state.searchConditions.destination = action.payload
            return { ...state }
        case ActionTypes.SET_HOTEL_CHECKIN:
            state.searchConditions.checkIn = action.payload
            return { ...state }
        case ActionTypes.SET_HOTEL_CHECKOUT:
            state.searchConditions.checkOut = action.payload
            return { ...state }
        case ActionTypes.SET_HOTEL_HOTELADDRESS:
            state.searchConditions.hotelAddress = action.payload
            return { ...state }
        case ActionTypes.SET_HOTEL_KEYWORDS:
            state.searchConditions.keyWords = action.payload
            return { ...state }
        case ActionTypes.SET_HOTEL_CHECKINANDOUT:
            state.searchConditions.checkIn = action.payload.checkIn
            state.searchConditions.checkOut = action.payload.checkOut
            return { ...state }
        default:
            return state
    }
}

export default hotelReducers
