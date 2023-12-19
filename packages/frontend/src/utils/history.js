export const storeHistory = (id) => {
  let idSet = new Set()

  if (localStorage.getItem('history')) {
    idSet = new Set(JSON.parse(localStorage.getItem('history')))
  }

  idSet.add(id)

  localStorage.setItem('history', JSON.stringify(Array.from(idSet)))
}
export const getHistory = () => {
  return localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []
}
