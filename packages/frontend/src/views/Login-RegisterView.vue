<script>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { goHome, replaceLogin } from '@/utils/router'
import { useUserStore } from '@/stores/userStore'
import { TheButton, TheIcon } from 'ui'
import { http, msg, useToken, showMsg } from 'common'

export default {
  name: 'Login-Register',
  components: { RouterLink, TheButton, TheIcon },
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
            popupType: 'alert'
          })
          return
        }
      }

      try {
        const response = await http.login(data)
        if (response.code === 200) {
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
            if (route.name === 'login') {
              goHome()
            }
          }, 2000)
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
        if (response.code === 200) {
          isSuccess.value = true
          showMsg({
            msg: msg['REGISTER_SUCCESS'],
            messageType: 'success',
            popupType: 'toast',
            toastPos: ['bottom', 'end']
          })
          setTimeout(() => {
            replaceLogin()
          }, 1000)
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
  <main class="flex justify-center items-center h-screen">
    <div class="card bg-primary shadow-md shadow-neutral max-w-lg w-4/5">
      <div class="card-body pb-6 pt-8 font-base_2">
        <div class="card-title my-4 tracking-wider whitespace-nowrap justify-between">
          <TheButton type="secondary" size="sm" class="self-start lg:btn-md" @click="goHome">
            <TheIcon type="house" class="lg:text-lg" />
          </TheButton>
          <span v-if="isLogin" class="text-lg md:text-xl lg:text-2xl">登入 Heisenye</span>
          <span v-else class="text-lg md:text-xl lg:text-2xl">注册 Heisenye</span>
          <TheButton type="accent" size="sm" shape="circle" class="lg:btn-md text-white">
            <i
              class="fa-solid text-base"
              :class="{ 'fa-lock': !isSuccess, 'fa-lock-open': isSuccess }"
            ></i>
          </TheButton>
        </div>
        <div class="md:space-y-4 lg:space-y-6">
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
              class="input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"
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
              class="input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"
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
        </div>
        <div class="label" v-if="isLogin">
          <a class="label-text-alt link link-hover text-info">忘记密码?</a>
          <RouterLink :to="{ name: 'register' }" class="label-text-alt link link-hover text-info"
            >注册</RouterLink
          >
        </div>
        <div class="label" v-else>
          <RouterLink :to="{ name: 'login' }" class="label-text-alt link link-hover text-info"
            >登录</RouterLink
          >
        </div>
        <button
          v-if="isLogin"
          class="btn btn-md btn-info text-base mb-4 md:mb-6 md:mt-4"
          @click="loginFn"
        >
          登入
        </button>
        <button v-else class="btn btn-md btn-info text-base mb-4 md:mb-6" @click="registerFn">
          注册
        </button>
      </div>
    </div>
  </main>
</template>
