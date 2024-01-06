<script>
import { onMounted, ref, watchEffect } from 'vue'
import { goBook } from '@/utils/router'
import { useHistory } from '@/utils/useHistory.js'
import { TheImage } from 'ui'
import { http, BASE_URL } from 'common'

export default {
  name: 'HistoryView',
  methods: { goBook },
  components: { TheImage },
  setup() {
    const { history } = useHistory()
    const historyComics = ref([])

    watchEffect(() => {
      historyComics.value = historyComics.value.filter((comic) => {
        return history.value.includes(comic._id)
      })
    })

    onMounted(async () => {
      const response = await http.getHistoryComics(history.value)
      if (response.code === 200) {
        const comics = response.data
        historyComics.value = comics.sort((a, b) => {
          return history.value.indexOf(b._id) - history.value.indexOf(a._id)
        })
      }
    })

    return {
      BASE_URL,
      historyComics,
      useHistory
    }
  }
}
</script>

<template>
  <main
    class="relative top-40 mx-auto w-full max-w-screen-2xl min-w-[300px] px-1 space-y-4 text-white"
  >
    <template v-for="comic in historyComics" :key="comic._id">
      <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 card inline-flex px-4 md:px-3 lg:px-2 indicator">
        <TheImage
          class="cursor-pointer"
          :src="`${BASE_URL}/${comic._id}/${comic.coverImage.chapter}/${comic.coverImage.page}.webp`"
          @click="goBook(comic._id)"
        />
        <i
          class="indicator-item cursor-pointer fa-solid fa-circle-xmark absolute right-2"
          @click="useHistory().removeHistoryFromStorage(comic._id)"
        ></i>
        <div
          class="card-body text-center bg-primary rounded-b-2xl font-base py-6 px-0 whitespace-nowrap"
        >
          {{ comic.name }}
        </div>
      </div>
    </template>
  </main>
</template>
