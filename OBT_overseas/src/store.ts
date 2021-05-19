import { createStore, combineReducers } from 'redux'
import loginPage from './pages/login/flow/reducers'

const reducers = combineReducers({ loginPage })

export default createStore(reducers)
