import React from 'react'
import type { TArticle } from '../stores/articleStore'

const ListItem = ({ id, name, createDate, categories, author }: TArticle) => {
  return (
    <div className="relative">
      <div className="space-y-2 sm:space-y-0 sm:flex justify-between">
        <h1 className="text-xl flex-grow hover:text-blue-500 cursor-pointer">
          {name}
        </h1>
        <p className="text-sm text-gray-400">Create Date: {createDate}</p>
      </div>
      <div className="space-y-2 sm:space-y-0 mt-2 sm:flex items-center sm:space-x-10">
        <div>
          <span className="text-sm text-gray-400">Category: </span>
          {categories.map((category, index) => (
            <span
              className="text-sm text-gray-400 hover:text-blue-500 cursor-pointer"
              key={index}
            >
              {category}
              {index === categories.length - 1 ? '' : ','}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-400">From: {author}</p>
      </div>
    </div>
  )
}

export default ListItem
