import { ref, watch } from 'vue'

const getToken = () => {
  return localStorage.getItem('token')
}

const token = ref(getToken())

watch(token, (newVal) => {
  if (!newVal) {
    localStorage.removeItem('token')
  } else {
    localStorage.setItem('token', newVal)
  }
})

const useToken = {
  token,
  setToken(value) {
    token.value = value
  },
  removeToken() {
    token.value = null
  }
}

export default useToken