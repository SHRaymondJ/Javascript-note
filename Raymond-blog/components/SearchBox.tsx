import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import { observer } from 'mobx-react-lite'
import { useSearchStore } from '../stores/SearchContext'

const SearchBox = observer(() => {
  const searchStore = useSearchStore()
  return (
    <div
      className={`fixed h-screen w-screen top-0 left-0 bg-white bg-opacity-90 transition-opacity transform duration-200 ease-out ${
        searchStore.opacity === 0 ? 'opacity-0' : 'opacity-100'
      } ${searchStore.visible ? 'block' : 'hidden'}`}
    >
      <XIcon
        onClick={() => searchStore.closeSearchBox()}
        className="absolute w-14 right-4 top-0 p-2 bg-white sm:right-16 sm:top-6 text-gray-700 hover:text-white hover:bg-yellow-200 cursor-pointer transition transform duration-300"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          className="border-b border-gray-900 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black placeholder-gray-300 outline-none font-serif"
          placeholder="Search..."
        />
      </div>
    </div>
  )
})

export default SearchBox
