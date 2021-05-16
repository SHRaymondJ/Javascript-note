export const setBaseURL = (BASE: string) => {
  if (BASE && BASE != '') {
    localStorage.setItem('BASE', BASE)
  }
}