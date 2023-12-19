<script>
import { onMounted, ref } from 'vue'
import { goBook } from '@/utils/router'
import { TheImage } from 'ui'
import { http } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'FavoriteView',
  components: { TheImage },
  setup() {
    const favoriteComics = ref(null)

    onMounted(async () => {
      try {
        const response = await http.getFavoriteComics()
        if (response.code === 200) {
          favoriteComics.value = response.data
        }
      } catch (error) {
        console.error(error)
      }
    })
    return {
      BASE_URL,
      favoriteComics,

      goBook
    }
  }
}
</script>

<template>
  <main
    class="absolute top-44 w-full max-w-4xl min-w-[300px] left-1/2 -translate-x-1/2 space-y-4 text-white px-1"
  >
    <template v-for="comic in favoriteComics" :key="comic._id">
      <div class="w-1/2 md:w-1/3 lg:w-1/4 inline-flex card px-3">
        <TheImage
          :src="`${BASE_URL}/${comic._id}/${comic.coverImage.chapter}/${comic.coverImage.page}.webp`"
          :blur="false"
          class="cursor-pointer"
          @click="goBook(comic._id)"
        />
        <div class="card-body bg-primary rounded-b-2xl pt-4 px-3 pb-3">
          <h1 class="font-cn_3 text-center whitespace-nowrap">{{ comic.name }}</h1>
          <h2 class="font-cn_2 text-sm text-center opacity-60">{{ comic.author }}</h2>
          <h3 class="opacity-60">
            <span class="font-cn_2 text-xs">最后更新：</span
            ><span class="text-xs opacity-60">{{
              new Date(comic.updatedAt).toLocaleDateString()
            }}</span>
          </h3>
        </div>
      </div>
    </template>
  </main>
</template>
