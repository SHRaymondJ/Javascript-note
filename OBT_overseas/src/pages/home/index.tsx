import React from 'react'
import { checkProfile } from '../../utils/checkProfile'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Air from '../air'
import Hotel from '../hotel'
import Header from '../../components/header/header'
import './index.scss'

const Homepage = () => {
    checkProfile()
    return (
        <>
            <Router>
                <Header></Header>
                <section className="home-container">
                    <Switch>
                        <Route exact path="/air">
                            <Air></Air>
                        </Route>
                        <Route exact path="/hotel">
                            <Hotel></Hotel>
                        </Route>
                    </Switch>
                </section>
            </Router>
        </>
    )
}

export default Homepage
