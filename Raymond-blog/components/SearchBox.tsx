import React from 'react'
import { XIcon } from '@heroicons/react/outline'

interface ISearchBox {
    toggleSearchBox:() => void
    opacity: number
}

const SearchBox = ({toggleSearchBox, opacity} : ISearchBox) => {
    return (
        <div className={`fixed h-screen w-screen top-0 left-0 bg-white bg-opacity-60 ${'opacity-' + opacity} transition-all transform duration-1000 ease-out`}>
            <XIcon 
                onClick={(e) => toggleSearchBox()}
                className="absolute w-14 right-0 top-0 p-2 bg-white sm:right-16 sm:top-6 text-gray-700 hover:text-white hover:bg-yellow-200 cursor-pointer transition transform duration-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <input
                    type="text"
                    className="border-b border-gray-900 font-bold text-3xl text-black placeholder-gray-300 outline-none font-serif"
                    placeholder="Search..."
                />
            </div>
        </div>
    )
}

export default SearchBox
