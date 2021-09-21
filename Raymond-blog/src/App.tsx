import React from 'react'
import Navigation from '../components/Navigation'
import HomePageBody from '../components/HomePageBody'
import { SearchProvider } from '../stores/SearchContext'
import { ArticleProvider } from '../stores/ArticleContexct'
import RaymondLogo from './img/myName.gif'

const App: React.FC = () => {
  return (
    <div className="relative">
      {/* <img
        src={RaymondLogo}
        alt="Raymond Jiang"
        className="m-auto w-96 mt-6 hidden sm:block"
      /> */}
      <SearchProvider>
        <Navigation></Navigation>
      </SearchProvider>
      <ArticleProvider>
        <HomePageBody></HomePageBody>
      </ArticleProvider>
    </div>
  )
}

export default App
