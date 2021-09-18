export type TArticle = {
  id: number
  name: string
  createDate: string
  categories: Array<string>
  author: string
}

export interface IarticleStore {
  articleList: Array<TArticle>
  activeArticleID: number
  getArticleList: () => void
  getActiveArticle: (id: number) => TArticle
  selectArticle: (id: number) => void
}

export const createArticleStore = (): IarticleStore => {
  return {
    articleList: [],
    activeArticleID: 0,
    async getArticleList() {
      if (this.articleList.length === 0) {
        const list = await fetch('../fakeData/article.json').then((res) =>
          res.json()
        )
        this.articleList = [...list.articles]
      }
    },
    getActiveArticle(id) {
      return this.articleList.filter((article) => article.id === id)[0]
    },
    selectArticle(id) {
      this.activeArticleID = id
    },
  }
}
