import React, { useState } from 'react'
import { MenuIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import SearchBoxDisplay from './SearchBox'
import { useSearchStore } from '../stores/SearchContext'
import { observer } from 'mobx-react-lite'
import RaymondLogo from '../src/img/myName.gif'


const Navigation: React.FC = observer(() => {
  const [smallNavDisplay, setSmallNavDisplay] = useState(false)

  const toggleSmallNavDisplay = () => {
    setSmallNavDisplay(!smallNavDisplay)
  }
  const searchStore = useSearchStore()
  return (
    <div className="sticky top-0 bg-white w-full overflow-hidden shadow-lg sm:shadow-none z-10">
      <div className="flex justify-between items-center">
        <MenuIcon
          className="w-14 h-14 py-4 sm:hidden px-4 
                    text-gray-700 hover:text-white hover:bg-yellow-200 cursor-pointer transition-default"
          onClick={toggleSmallNavDisplay}
        />

        {/* nav-bar for big devices */}
        <div className="hidden pl-16 pt-6 sm:flex justify-between flex-grow">
          <div className="border-b nav-btn">Home</div>
          <div className="border-b nav-btn">Study</div>
          <div className="border-b nav-btn">Demo</div>
          <div className="border-b nav-btn">Reading</div>
          <div className="border-b nav-btn">contact</div>
        </div>
        <img src={RaymondLogo} alt="Raymond Jiang" className="w-20 h-full sm:hidden"/>
        <SearchIcon
          className="w-14 h-14 py-4 px-4 
                    text-gray-700 hover:text-white hover:bg-yellow-200 cursor-pointer transition transform duration-300 sm:mt-6 sm:mr-16"
          onClick={() => searchStore.openSearchBox()}
        />
      </div>
      {/* nav-bar for small devices */}
      <div
        className={`nav-sm-container relative flex ${
          smallNavDisplay
            ? `max-h-96 overflow-scroll`
            : 'max-h-0 overflow-hidden'
        } flex-col sm:px-16 sm:hidden sm:justify-between transition-default origin-top scrollbar-hide`}
      >
        <div className="nav-btn">Home</div>
        <div className="nav-btn">Study</div>
        <div className="nav-btn">Demo</div>
        <div className="nav-btn">Reading</div>
        <div className="nav-btn">contact</div>
      </div>

      <SearchBoxDisplay />
    </div>
  )
})

export default Navigation
