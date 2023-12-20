import router from '@/router'

export const refresh = () => {
  router.go(0)
}

export const goHome = () => {
  router.push({ name: 'home' })
}

export const goBook = (id) => {
  router.push({ name: 'book', params: { id: id } })
}

export const goRead = (id, chapter) => {
  router.replace({ name: 'read', params: { id: id, chapter: chapter } })
}

export const goBack = () => {
  router.go(-1)
}

export const goLogin = () => {
  router.push({ name: 'login' })
}

export const replaceLogin = () => {
  router.replace({ name: 'login' })
}

export const goRegister = () => {
  router.push({ name: 'register' })
}

export const goProfile = () => {
  router.push({ name: 'profile' })
}

export const goSearch = () => {
  router.push({ name: 'search' })
}

export const goSearchResult = (keyword) => {
  router.push({ name: 'search', query: { keyword: keyword } })
}

export const goSearchResultWithPage = (keyword, page) => {
  router.push({ name: 'search', params: { keyword: keyword, page: page } })
}
