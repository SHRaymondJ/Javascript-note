import React from 'react'
import ProgressBar from '../../components/ProgressBar'
import SearchBox from './components/SearchBox'

const index = () => {
    return (
        <div>
            <ProgressBar step={1}></ProgressBar>
            <SearchBox></SearchBox>
        </div>
    )
}

export default index
