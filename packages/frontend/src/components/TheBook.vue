<script>
import { onMounted, ref, toRefs } from 'vue'
import { TheButton, TheIcon, TheImage } from 'ui'
import { http } from 'common'
import { useToken } from 'common'
import { showMsg } from 'common'
import { msg } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'TheBook',
  components: { TheButton, TheIcon, TheImage },
  props: {
    comic: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { comic } = props
    const { token } = useToken()

    const isFavorited = ref(false)

    const {
      name,
      _id: id,
      coverImage,
      updatedAt: date,
      chapters,
      author,
      tags,
      description,
      status
    } = comic

    const { viewCount, favoriteCount } = toRefs(comic)

    onMounted(async () => {
      if (!token.value) {
        return
      }
      try {
        const response = await http.getFavorite(id)
        if (response.data) {
          isFavorited.value = true
        }
      } catch (error) {
        console.error(error)
      }
    })

    const addOrDeleteFavoriteFn = async () => {
      try {
        if (!token.value) {
          showMsg({
            msg: msg['NO_TOKEN'],
            messageType: 'info',
            popupType: 'alert'
          })
          return
        }
        if (isFavorited.value) {
          const response = await http.deleteFavorite(id)
          if (response.code === 200) {
            isFavorited.value = false
            favoriteCount.value--
            showMsg({
              msg: msg['DELETE_FAVORITE_SUCCESS'],
              messageType: 'success',
              popupType: 'toast',
              toastPos: ['end', 'bottom']
            })
          }
        } else {
          const response = await http.postFavorite({
            id
          })
          if (response.code === 200) {
            isFavorited.value = true
            favoriteCount.value++
            showMsg({
              msg: msg['ADD_FAVORITE_SUCCESS'],
              messageType: 'success',
              popupType: 'toast',
              toastPos: ['start', 'bottom']
            })
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      BASE_URL,
      isFavorited,
      id,
      coverImage,
      name,
      date,
      viewCount,
      favoriteCount,
      chapters,
      author,
      tags,
      description,
      status,
      addOrDeleteFavoriteFn
    }
  }
}
</script>

<template>
  <main class="absolute w-full top-20 px-3 sm:px-4 md:px-6 lg:px-4">
    <div
      class="relative left-1/2 -translate-x-1/2 w-full card rounded max-w-3xl bg-primary lg:card-side lg:py-4"
    >
      <div
        class="absolute bookmark border-[32px] -left-4 -top-4 xl:border-[40px]"
        v-if="status === 'completed'"
      >
        <p class="absolute -left-6 -top-6 xl:text-lg font-base_3">完结</p>
      </div>
      <div class="relative flex justify-center pb-6 pt-8 lg:w-3/5">
        <TheImage
          :src="`${BASE_URL}/${id}/${coverImage.chapter}/${coverImage.page}.webp`"
          class="rounded-lg w-3/5 lg:rounded-lg h-fit"
        />
      </div>
      <div class="card-body pt-4 px-6 md:px-6 rounded-b-xl xl:text-lg">
        <h1 class="font-base_3 card-title text-2xl xl:text-3xl self-center pb-2">{{ name }}</h1>
        <div class="text-accent">
          <span>{{ new Date(date).toLocaleDateString() }}</span
          >&nbsp; | &nbsp;<i class="fa-solid fa-eye"></i>&nbsp;
          <span>{{ viewCount }}</span>
          &nbsp;<i class="fa-solid fa-heart"></i>&nbsp; <span>{{ favoriteCount }}</span
          >&nbsp; | &nbsp;<i class="fa-solid fa-book"></i>&nbsp;
          <span>{{ chapters }}</span>
        </div>
        <div class="font-base_2">
          作者：<button class="btn btn-sm btn-secondary">{{ author }}</button>
        </div>
        <div class="font-base_2 space-x-1.5">
          标签：
          <template v-for="tag in tags" :key="tag">
            <button class="btn btn-sm btn-secondary">{{ tag }}</button>
          </template>
        </div>
        <div class="font-base_2">简介：{{ description }}</div>
        <TheButton
          type="error"
          class="w-32 lg:w-28 xl:w-32 mx-auto my-3"
          @click="addOrDeleteFavoriteFn"
        >
          <TheIcon
            type="heart"
            class="text-lg lg:text-md xl:text-lg text-white"
            :variant="isFavorited ? 'solid' : 'regular'"
          />
        </TheButton>
        <h1 class="font-base_3 text-lg mx-auto">章节</h1>
        <div class="grid grid-cols-4 gap-x-6 place-items-center">
          <template v-for="n in chapters" :key="n">
            <RouterLink
              :to="{ name: 'read', params: { id: id, chapter: n } }"
              class="btn btn-sm btn-secondary w-12"
              replace
            >
              {{ n }}
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
