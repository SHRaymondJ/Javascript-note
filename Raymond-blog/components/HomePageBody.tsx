import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useArticleStore } from '../stores/ArticleContexct'
import List from './List'

const HomePageBody: React.FC = observer(() => {
  const articleStore = useArticleStore()
  useEffect(() => {
    articleStore.getArticleList()
  }, [])
  return (
    <div className="px-16 pt-6 h-[3000px]">
      <List></List>
    </div>
  )
})

export default HomePageBody
