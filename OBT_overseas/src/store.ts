import { createStore, combineReducers } from 'redux'
import loginPage from './pages/login/container'

const reducers = combineReducers({ loginPage })

export default createStore(reducers)
