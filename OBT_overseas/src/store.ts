import { createStore, combineReducers } from 'redux'
import loginPage from './pages/login/flow/reducers'
import homePage from './pages/home/flow/reducers'
import hotelPage from './pages/hotel/flow/reducers'
import common from './commonReducers'

const reducers = combineReducers({ loginPage, homePage, common, hotelPage })

export default createStore(reducers)
