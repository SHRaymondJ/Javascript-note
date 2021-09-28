export type TArticle = {
  id: number
  name: string
  createDate: string
  categories: Array<string>
  author: string
  filePath: string
}

export interface IarticleStore {
  articleList: Array<TArticle>
  activeArticleID: number
  getArticleList: () => void
  getActiveArticle: (id: number) => Promise<string>
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
    async getActiveArticle(id) {
      await this.getArticleList()
      return this.articleList.filter((article) => article.id === id)[0].filePath
    },
    selectArticle(id) {
      this.activeArticleID = id
    },
  }
}
