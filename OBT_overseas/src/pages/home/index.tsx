import React from 'react'
import { useCheckProfile } from '../../utils/checkProfile'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Air from '../air'
import Hotel from '../hotel'
import Search from '../search/search'
import Header from '../../components/header/header'
import './index.scss'

const Homepage = () => {
    useCheckProfile()
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
                        <Route exact path="/search/:category">
                            <Search></Search>
                        </Route>
                    </Switch>
                </section>
            </Router>
        </>
    )
}

export default Homepage
