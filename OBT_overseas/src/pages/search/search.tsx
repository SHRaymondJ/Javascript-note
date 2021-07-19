import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams,
} from 'react-router-dom'

const SearchCategory = () => {
    let { category } = useParams<any>()
    return <div>this is {category} from home</div>
}

const search = () => {
    return (
        <div>
            <SearchCategory></SearchCategory>
        </div>
    )
}

export default search
