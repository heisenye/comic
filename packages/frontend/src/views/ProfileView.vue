<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { refresh } from '@/utils/router'
import { useUserStore } from '@/stores/userStore'
import TheAvatar from '@/components/TheAvatar.vue'
import { TheButton, TheIcon } from 'ui'
import { useToken } from 'common'
import { http } from 'common'
import { showMsg } from 'common'
import { msg } from 'common'
import { BASE_URL } from 'common'

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

export default {
  name: 'ProfileView',
  components: { TheIcon, TheButton, TheAvatar },
  setup() {
    const userStore = useUserStore()
    const { token } = useToken()

    const input = ref()
    const modal = ref()
    const previewSrc = ref('')

    const uploadError = () => {
      URL.revokeObjectURL(previewSrc.value)
      previewSrc.value = ''
      showMsg({
        msg: msg['UPLOAD_ERROR'],
        messageType: 'error',
        popupType: 'alert'
      })
    }

    const cancelUpload = () => {
      URL.revokeObjectURL(previewSrc.value)
      previewSrc.value = ''
      input.value.value = null
    }
    const showPreview = () => {
      const file = input.value.files[0]
      if (!file) return
      const fileType = file.type
      if (allowedTypes.includes(fileType)) {
        previewSrc.value = URL.createObjectURL(file)
        modal.value.showModal()
      } else {
        showMsg({
          msg: msg['AVATAR_FORMAT_ERROR'],
          messageType: 'error',
          popupType: 'alert'
        })
        input.value.value = null
        return
      }
      if (file.size > 1024 * 1024 * 10) {
        showMsg({
          msg: msg['AVATAR_SIZE_ERROR'],
          messageType: 'error',
          popupType: 'alert'
        })
        input.value.value = null
      }
    }

    const uploadAvatar = async () => {
      showMsg({
        msg: msg['UPLOADING'],
        messageType: 'info',
        popupType: 'alert'
      })
      const form = new FormData()
      form.append('avatar', input.value.files[0])
      const response = await http.postAvatar(form)
      if (response.code === 200) {
        refresh()
      }
    }

    onMounted(async () => {
      try {
        const response = await http.getProfile(token.value)
        if (response.code === 200) {
          userStore.setUser(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    })

    onUnmounted(() => {
      if (previewSrc.value) {
        URL.revokeObjectURL(previewSrc.value)
      }
    })
    const { username, id, createdAt, logout } = userStore

    return {
      username,
      id,
      createdAt,
      previewSrc,
      input,
      modal,
      showPreview,
      uploadError,
      cancelUpload,
      uploadAvatar,
      logout,
      BASE_URL
    }
  }
}
</script>

<template>
  <main class="absolute top-36 w-full px-3 md:px-4 lg:px-5">
    <div
      class="relative max-w-2xl w-full left-1/2 -translate-x-1/2 space-y-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-3"
    >
      <div class="navbar rounded-xl bg-primary w-full text-sm px-4 lg:col-span-2">
        <TheButton type="secondary" shape="circle" class="relative h-20 w-20 lg:h-24 lg:w-24">
          <input type="file" class="hidden h-0 w-0" ref="input" @change="showPreview" />
          <TheAvatar
            size="2xl"
            class="w-full hover:opacity-40 transition-opacity z-20"
            @click="() => input.click()"
          />
        </TheButton>
        <div class="mx-4 lg:mx-6 flex-1">
          <span class="text-xl lg:text-2xl tracking-wider">{{ username }}</span>
        </div>
        <TheButton
          type="error"
          class="z-50 h-10 lg:h-12 lg:w-20 lg:text-base text-black font-cn_2"
          @click="logout"
        >
          登出
        </TheButton>
      </div>
      <div class="navbar rounded-xl bg-primary w-full text-sm px-4">
        <div class="flex-none lg:flex lg:flex-col lg:w-full lg:items-start lg:pl-2">
          <span class="text-xl tracking-wider text-white pr-4">UID</span>
          <span class="tracking-wider">{{ id }}</span>
        </div>
      </div>
      <div class="navbar rounded-xl bg-primary w-full text-sm px-4">
        <span class="font-cn_3 text-lg text-white pr-4">注册时间</span>
        <span class="text-lg tracking-wide">{{ createdAt }}</span>
      </div>
    </div>
    <dialog class="modal" ref="modal">
      <div class="modal-box bg-primary">
        <form method="dialog">
          <TheButton type="ghost" shape="circle" class="absolute right-0 top-0 z-10">
            <TheIcon type="xmark-circle" class="text-lg" />
          </TheButton>
        </form>
        <div class="relative flex justify-center z-0">
          <div class="rounded-full h-28 w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 overflow-hidden">
            <img :src="previewSrc" alt="" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="flex justify-center">
          <TheButton type="accent" class="w-32 lg:w-20 mx-auto my-3" @click="uploadAvatar">
            <span class="font-cn_3">上传</span>
          </TheButton>
          <form method="dialog" class="hidden lg:block mx-auto">
            <TheButton type="info" class="w-20 my-3" @click="cancelUpload">
              <span class="font-cn_3">取消</span>
            </TheButton>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="cancelUpload"></button>
      </form>
    </dialog>
  </main>
</template>
