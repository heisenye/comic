import { ref, watch } from 'vue'

const getHistoryFromStorage = () => {
  return JSON.parse(localStorage.getItem('history') ?? JSON.stringify([]))
}

const history = ref(getHistoryFromStorage())

const storeHistoryToStorage = (id) => {
  const idSet = new Set(history.value)
  if (idSet.has(id)) idSet.delete(id)
  idSet.add(id)
  history.value = Array.from(idSet)
}

const removeHistoryFromStorage = (id) => {
  const idSet = new Set(history.value)
  idSet.delete(id)
  history.value = Array.from(idSet)
}

watch(history, (newVal) => localStorage.setItem('history', JSON.stringify(newVal)))

const useHistory = {
  history,
  storeHistoryToStorage,
  removeHistoryFromStorage
}

export default useHistory
// export function useHistory() {
//   return {
//     history,
//     storeHistoryToStorage,
//     removeHistoryFromStorage
//   }
// }
