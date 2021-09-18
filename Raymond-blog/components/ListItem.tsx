import React from 'react'
import type { TArticle } from '../stores/articleStore'

const ListItem = ({ id, name, createDate, categories, author }: TArticle) => {
  return (
    <div className="relative grid grid-cols-1 ">
      <h1 className="text-xl hover:text-blue-500 cursor-pointer">{name}</h1>
      <p className="text-sm text-gray-400">Create Date: {createDate}</p>
      <div className="">
        {categories.map((category, index) => (
          <span className="text-sm text-gray-400 hover:text-blue-500 cursor-pointer" key={index}>
            {category}{index === categories.length - 1 ? '' : ','}
          </span>
        ))}
      </div>
      <p>{author}</p>
    </div>
  )
}

export default ListItem
