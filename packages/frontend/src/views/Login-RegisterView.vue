<script>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { goHome, replaceLogin } from '@/utils/router'
import { useUserStore } from '@/stores/userStore'
import { http } from 'common'
import { useToken } from 'common'
import { showMsg } from 'common'
import { msg } from 'common'

export default {
  name: 'Login-Register',
  components: { RouterLink },
  setup() {
    const route = useRoute()

    const userStore = useUserStore()
    const { setToken } = useToken()

    const isLogin = ref(route.fullPath === '/login')
    const username = ref('')
    const pwd = ref('')
    const email = ref('')
    const isSuccess = ref(false)

    const loginFn = async () => {
      const data = {
        username: username.value,
        pwd: pwd.value
      }

      for (const key in data) {
        if (!data[key]) {
          showMsg({
            msg: msg['INCOMPLETE_FORM'],
            messageType: 'info',
            popupType: 'alert',
          })
          return
        }
      }

      try {
        const response = await http.login(data)
        if (response) {
          userStore.setUser(response.data)

          const token = response.data.token
          setToken(token)
          isSuccess.value = true
          showMsg({
            msg: msg['LOGIN_SUCCESS'],
            messageType: 'success',
            popupType: 'toast',
            toastPos: ['bottom', 'end']
          })
          setTimeout(() => {
            goHome()
          }, 3000)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const registerFn = async () => {
      const data = {
        username: username.value,
        pwd: pwd.value
      }

      for (const key in data) {
        if (!data[key]) {
          showMsg(msg['INCOMPLETE_FORM'])
          return
        }
      }
      try {
        const response = await http.register(data)
        if (response) {
          isSuccess.value = true
          showMsg({
            msg: msg['REGISTER_SUCCESS'],
            messageType: 'success',
            popupType: 'toast',
            toastPos: ['bottom', 'end']
          })
          setTimeout(() => {
            replaceLogin()
          }, 3000)
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      isLogin,
      isSuccess,
      username,
      pwd,
      email,
      goHome,
      loginFn,
      registerFn
    }
  }
}
</script>

<template>
  <main class="h-screen flex hero mx-auto align-center px-8 bg-base-100 min-w-[300px] max-w-lg">
    <div class="hero-content flex-col w-full px-0">
      <div class="text-center font-cn_2"></div>
      <div class="card shadow-2xl bg-primary w-full">
        <div class="card-body pb-6 pt-8 font-cn_2 w-full">
          <div class="card-title my-4 tracking-wider whitespace-nowrap justify-between">
            <button class="btn btn-sm btn-secondary self-start" @click="goHome">
              <i class="fa-solid fa-house"></i>
            </button>
            <span v-if="isLogin" class="text-lg md:text-xl">登入 Heisenye</span>
            <span v-else class="text-lg md:text-xl">注册 Heisenye</span>
            <button class="btn btn-sm btn-circle btn-accent">
              <i class="fa-solid" :class="{ 'fa-lock': !isSuccess, 'fa-lock-open': isSuccess }"></i>
            </button>
          </div>
          <div class="form-control">
            <label for="username" class="label">
              <span class="label-text"
                ><span v-if="!isLogin" class="text-warning">*</span>用户名</span
              >
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="用户名"
              class="input input-bordered bg-secondary border-accent focus:border-info font-Noto"
            />
          </div>
          <div class="form-control">
            <label for="pwd" class="label">
              <span class="label-text"
                ><span v-if="!isLogin" class="text-warning">*</span>密码</span
              >
            </label>
            <input
              id="pwd"
              v-model="pwd"
              type="password"
              placeholder="密码"
              class="input input-bordered bg-secondary border-accent focus:border-info font-Noto"
            />
          </div>
          <div class="form-control" v-if="!isLogin">
            <label for="email" class="label">
              <span class="label-text"><span class="text-warning">*</span>Email</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              class="input input-bordered bg-secondary"
            />
          </div>
          <div class="label" v-if="isLogin">
            <a href="#" class="label-text-alt link link-hover text-info">忘记密码?</a>
            <RouterLink :to="{ name: 'register' }" class="label-text-alt link link-hover text-info"
              >注册</RouterLink
            >
          </div>
          <div class="label" v-else>
            <RouterLink :to="{ name: 'login' }" class="label-text-alt link link-hover text-info"
              >登录</RouterLink
            >
          </div>
          <button v-if="isLogin" class="btn btn-md btn-info text-base" @click="loginFn">
            登入
          </button>
          <button v-else class="btn btn-md btn-info text-base" @click="registerFn">注册</button>
        </div>
      </div>
    </div>
  </main>
</template>
