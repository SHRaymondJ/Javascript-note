import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import ResetPassword from './pages/resetPassword/ResetPassword'
import './App.scss'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/Login">
                    <Login></Login>
                </Route>
                <Route exact path="/ResetPassword">
                    <ResetPassword></ResetPassword>
                </Route>
                <Route exact path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
