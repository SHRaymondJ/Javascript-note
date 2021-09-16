import React from 'react'
import Navigation from '../components/Navigation'
import HomePageBody from '../components/HomePageBody'

const App: React.FC = () => {
    return (
        <div className="relative">
            <Navigation></Navigation>
            <HomePageBody></HomePageBody>
        </div>
    )
}

export default App
