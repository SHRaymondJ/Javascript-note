import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home/Homepage'
import ResetPassword from './pages/resetPassword/ResetPassword'


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/Login">
                    <Login></Login>
                </Route>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/ResetPassword">
                    <ResetPassword></ResetPassword>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
