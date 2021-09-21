import React from 'react'
import ListItem from './ListItem'
import { observer } from 'mobx-react-lite'
import { useArticleStore } from '../stores/ArticleContexct'

const List = observer(() => {
  const articleStore = useArticleStore()
  return (
    <div className="relative gap-8 flex flex-col max-w-[1200px] mx-auto">
      {articleStore.articleList.map((article) => (
        <ListItem key={article.id} {...article} />
      ))}
    </div>
  )
})

export default List
