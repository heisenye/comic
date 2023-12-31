<script>
import { onMounted, ref } from 'vue'
import { goBook } from '@/utils/router'
import { TheImage } from 'ui'
import { getHistory } from '@/utils/history'
import { http } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'HistoryView',
  methods: { goBook },
  components: { TheImage },
  setup() {
    const history = getHistory()
    const historyComics = ref(null)

    const removeHistory = (id) => {
      const idSet = new Set(JSON.parse(localStorage.getItem('history')))
      idSet.delete(id)

      const comic = historyComics.value.find((comic) => comic._id === id)
      if (comic) comic.isVisible = false

      localStorage.setItem('history', JSON.stringify(Array.from(idSet)))
    }

    onMounted(async () => {
      try {
        const response = await http.getHistoryComics(history)
        if (response.code === 200) {
          const comics = response.data
          if (typeof comics === 'object' && !Array.isArray(comics)) {
            comics.isVisible = true
            historyComics.value = [comics]
            return
          }
          comics.forEach((comic) => (comic.isVisible = true))
          historyComics.value = comics
        }
      } catch (error) {
        console.error(error)
      }
    })

    return {
      BASE_URL,
      historyComics,
      removeHistory
    }
  }
}
</script>

<template>
  <main class="relative top-40 mx-auto w-full max-w-4xl min-w-[300px] px-1 space-y-4 text-white">
    <template v-for="comic in historyComics" :key="comic._id">
      <div
        v-if="comic.isVisible"
        class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 card inline-flex px-6 md:px-4 lg:px-3 indicator"
      >
        <TheImage
          class="cursor-pointer"
          :src="`${BASE_URL}/${comic._id}/${comic.coverImage.chapter}/${comic.coverImage.page}.webp`"
          :alt="comic.name"
          @click="goBook(comic._id)"
        />
        <i
          class="indicator-item fa-solid fa-circle-xmark absolute right-2"
          @click="removeHistory(comic._id)"
        ></i>
        <div
          class="card-body text-center bg-primary rounded-b-2xl font-base_2 py-6 px-0 whitespace-nowrap"
        >
          {{ comic.name }}
        </div>
      </div>
    </template>
  </main>
</template>
