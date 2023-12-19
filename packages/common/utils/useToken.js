import { ref, watch } from 'vue'

const getToken = () => {
  return localStorage.getItem('token')
}

const token = ref(getToken())

watch(token, (newVal) => {
  if (newVal === null) {
    localStorage.removeItem('token')
  } else {
    localStorage.setItem('token', newVal)
  }
})

export function useToken() {
  return {
    token,
    setToken(value) {
      token.value = value
    },
    removeToken() {
      token.value = null
    }
  }
}
