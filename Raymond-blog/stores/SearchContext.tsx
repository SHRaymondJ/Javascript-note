import React, { createContext,useContext } from 'react'
import { createSearchStore, ISearchStore } from './searchStore'
import { useLocalObservable } from 'mobx-react-lite'

const SearchContext = createContext({} as ISearchStore)

export const SearchProvider:React.FC = ({ children }) => {
  const searchStore = useLocalObservable(createSearchStore)
  return (
    <SearchContext.Provider value={searchStore}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchStore = () => useContext(SearchContext)
