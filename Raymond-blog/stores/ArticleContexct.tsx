import React, { useContext, createContext } from 'react'
import type { IarticleStore } from './articleStore'
import { createArticleStore } from './articleStore'
import { useLocalStore } from 'mobx-react-lite'

const ArticleContext = createContext({} as IarticleStore)

export const ArticleProvider: React.FC = ({ children }) => {
  const articleStore = useLocalStore(createArticleStore)
  return (
    <ArticleContext.Provider value={articleStore}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticleStore = () => useContext(ArticleContext)
