import { defineStore } from 'pinia'
import { useToken } from 'common'
import { goHome } from '@/utils/router'

const { removeToken } = useToken

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      id: '',
      username: '',
      createdAt: ''
    }
  },
  actions: {
    setUser(user) {
      this.id = user.id
      this.username = user.username
      this.createdAt = user.createdAt || new Date('2042-1-1').toLocaleDateString()
    },
    logout() {
      this.id = ''
      this.username = ''
      this.createdAt = ''
      removeToken()
      goHome()
    }
  },
  persist: true
})
