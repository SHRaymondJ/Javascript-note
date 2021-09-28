import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useArticleStore } from '../stores/ArticleContext'
import List from './List'

const HomePageBody: React.FC = observer(() => {
  const articleStore = useArticleStore()

  useEffect(() => {
    articleStore.getArticleList()
  }, [])
  return (
    <div className="px-4 sm:px-16 pt-6">
      <List></List>
    </div>
  )
})

export default HomePageBody
