<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { refresh } from '@/utils/router'
import { useUserStore } from '@/stores/userStore'
import TheAvatar from '@/components/TheAvatar.vue'
import { TheButton, TheIcon } from 'ui'
import { useToken, http, showMsg, msg, BASE_URL } from 'common'

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

export default {
  name: 'ProfileView',
  components: { TheIcon, TheButton, TheAvatar },
  setup() {
    const userStore = useUserStore()
    const { token } = useToken

    const uploadAvatarInput = ref()
    const previewAvatarModal = ref()
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
      uploadAvatarInput.value.value = null
    }
    const previewAvatar = () => {
      const file = uploadAvatarInput.value.files[0]
      if (!file) return
      const fileType = file.type
      if (allowedTypes.includes(fileType)) {
        previewSrc.value = URL.createObjectURL(file)
        previewAvatarModal.value.showModal()
      } else {
        showMsg({
          msg: msg['AVATAR_FORMAT_ERROR'],
          messageType: 'error',
          popupType: 'alert'
        })
        uploadAvatarInput.value.value = null
        return
      }
      if (file.size > 1024 * 1024 * 10) {
        showMsg({
          msg: msg['AVATAR_SIZE_ERROR'],
          messageType: 'error',
          popupType: 'alert'
        })
        uploadAvatarInput.value.value = null
      }
    }

    const uploadAvatar = async () => {
      showMsg({
        msg: msg['UPLOADING'],
        messageType: 'info',
        popupType: 'alert'
      })
      const form = new FormData()
      form.append('avatar', uploadAvatarInput.value.files[0])
      const response = await http.postAvatar(form)
      if (response.code === 200) {
        refresh()
      }
    }

    onMounted(async () => {
      const response = await http.getProfile(token.value)
      if (response.code === 200) {
        userStore.setUser(response.data)
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
      uploadAvatarInput,
      previewAvatarModal,
      previewAvatar,
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
        <TheButton
          type="secondary"
          shape="circle"
          class="relative size-20 lg:size-24 overflow-hidden"
        >
          <input
            type="file"
            class="hidden h-0 w-0"
            ref="uploadAvatarInput"
            @change="previewAvatar"
          />
          <TheAvatar
            class="w-full hover:opacity-40 hover:scale-110 transition-all duration-500 z-20"
            @click="() => uploadAvatarInput.click()"
          >
            <TheIcon
              type="user"
              size="2xl"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-3xl text-neutral"
            />
          </TheAvatar>
        </TheButton>
        <div class="mx-4 lg:mx-6 flex-1">
          <span class="text-xl lg:text-2xl tracking-wider">{{ username }}</span>
        </div>
        <TheButton
          type="error"
          class="z-50 h-10 lg:h-12 lg:w-20 lg:text-base font-base"
          @click="logout"
        >
          登出
        </TheButton>
      </div>
      <div class="navbar rounded-xl bg-primary w-full px-4">
        <div class="flex-none lg:flex lg:flex-col lg:w-full lg:items-start lg:pl-2">
          <span class="text-xl pr-4 tracking-widest text-white">UID</span>
          <span class="text-sm tracking-wider">{{ id }}</span>
        </div>
      </div>
      <div class="navbar px-4 rounded-xl bg-primary w-full text-lg">
        <span class="pr-6 tracking-wider text-white font-base font-black">注册时间</span>
        <span class="tracking-wide">{{ createdAt }}</span>
      </div>
    </div>
    <dialog class="modal" ref="previewAvatarModal">
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
          <TheButton type="neutral" class="w-32 lg:w-20 mx-auto my-3" @click="uploadAvatar">
            <span class="font-base">上传</span>
          </TheButton>
          <form method="dialog" class="hidden lg:block mx-auto">
            <TheButton type="info" class="w-20 my-3" @click="cancelUpload">
              <span class="font-base">取消</span>
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
