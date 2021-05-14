import { createStore, combineReducers } from 'redux'
import login from './pages/login/container'

const reducers = combineReducers({ login })

export default createStore(reducers)
