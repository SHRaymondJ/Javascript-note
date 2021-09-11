import Image from 'next/image'
import { GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon, SearchIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [noOfGuests, setNoOfGuests] = useState(1)

    const router = useRouter()
    const searchHotel = () => {
        router.push({
            pathname: '/search',
            query: {
                search: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    const handleSelect = ranges => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    const clearSearchData = () => {
        setSearchInput('')
        setNoOfGuests(1)
    }
    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }
    
    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
            {/* left */}
            <div className='relative flex items-center h-10 cursor-pointer my-auto' onClick={() => {router.push('/')}}>
                <Image
                    src='/src/Airbnb_Logo.png'
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'
                />
            </div>

            {/* Middle - Search*/}
            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input
                    className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
                    type='text'
                    placeholder={placeholder || 'Start your search'}
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <SearchIcon className='hidden md:inline-flex md:mx-2 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer' />
            </div>

            {/* Right */}
            <div className='flex space-x-1 items-center justify-end text-gray-500'>
                <p className='hidden md:inline cursor-pointer text-sm px-4 py-2 rounded-full hover:bg-gray-100'>Become a host</p>
                <GlobeAltIcon className='h-10 cursor-pointer rounded-full hover:bg-gray-100 p-2' />

                <div className='flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-md'>
                    <MenuIcon className='h-6' />
                    <UserCircleIcon className='h-6' />
                </div>
            </div>

            {/* date range */}
            {
                searchInput && (
                    <div className="flex flex-col col-span-3 mx-auto relative">
                        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} minDate={new Date()} rangeColors={['#FD5B61']} className='w-full'/>

                        <div className="flex justify-between items-center border-b mb-4">
                            <h2 className="text-2xl font-semibold flex-grow">Number of Guests</h2>

                            <div className="flex items-center">
                                <UsersIcon className="h-5" />
                                <input type="number" className="w-12 pl-2 text-lg outline-none text-red-400" value={noOfGuests} onChange={e => setNoOfGuests(e.target.value)}/>
                            </div>
                        </div>

                        <div className="flex">
                            <button className="flex-grow text-gray-500" onClick={clearSearchData}>Cancel</button>
                            <button className="flex-grow text-red-400" onClick={searchHotel}>Search</button>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default Header
