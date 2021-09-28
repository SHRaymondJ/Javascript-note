import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useArticleStore } from '../stores/ArticleContext'
import marked from 'marked'
import '../style/markdown.scoped.scss'

const Article = observer(() => {
  const { articleId } = useParams<{ articleId: string }>()
  const articleStore = useArticleStore()

  const [file, setFile] = useState('')
  ;(async () => {
    const path = await articleStore.getActiveArticle(+articleId)
    const result = await fetch(path).then(
      (result) => result.text()
    )
    const markdown = marked(result)
    setFile(markdown)
  })()

  return (
    <div className="px-4 sm:px-16">{file && <article dangerouslySetInnerHTML={{ __html: file }}></article>}</div>
  )
})

export default Article
