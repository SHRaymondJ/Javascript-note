export interface ISearchStore {
  opacity: number
  visible: boolean
  openSearchBox: () => void
  closeSearchBox: () => void
}

export const createSearchStore = (): ISearchStore => {
  return {
    opacity: 0,
    visible: false,
    openSearchBox() {
      this.visible = true
      setTimeout(() => (this.opacity = 100), 0)
    },
    closeSearchBox() {
      this.opacity = 0
      setTimeout(() => (this.visible = false), 100)
    },
  }
}
