import React from 'react'
import Navigation from '../components/Navigation'
import HomePageBody from '../components/HomePageBody'
import { SearchProvider } from '../stores/SearchContext'
import { ArticleProvider } from '../stores/ArticleContext'
import RaymondLogo from './img/myName.gif'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Article from '../components/Article'

const App: React.FC = () => {
  return (
    <Router>
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
          <Switch>
            <Route path="/" exact>
              <HomePageBody></HomePageBody>
            </Route>
            <Route path="/article/:articleId">
              <Article></Article>
            </Route>
          </Switch>
        </ArticleProvider>
      </div>
    </Router>
  )
}

export default App
