<script>
import { onMounted, ref } from 'vue'
import { http } from 'common'
import { TheImage } from 'ui'
import { BASE_URL } from 'common'

export default {
  name: 'TheComicRow',
  components: { TheImage },
  setup() {
    const comic = ref(null)
    // (async () => {
    //   const response = await http.getComic('64d7bc26fcc6149b097c74db')
    //   response.data = comic.value
    //   console.log(response)
    // })()
    onMounted(async () => {
      const response = await http.getComic('64d7bc26fcc6149b097c74db')
      comic.value = response.data
      console.log(response)
      console.log(comic.value._id)
    })
    return {
      comic,
      BASE_URL
    }
  }
}
</script>

<template>
  <main class="absolute top-40 w-full max-w-md px-3 text-white">
    <div v-if="comic" class="w-full bg-primary card card-side rounded">
      <TheImage class="min-w-[35%] w-1/3" :src="`${BASE_URL}/${comic._id}/1/7.webp`" />
      <div class="card-body px-4 py-6 font-base_2">
        <h2 class="card-title mx-auto">{{ comic.name }}</h2>
        <div class="mt-4 text-sm opacity-60">
          {{ comic.author }} |
          <i class="fa-solid fa-eye pr-1 text-xs"></i>
          <span>{{ comic.viewCount }}</span>
          <i class="fa-solid fa-heart pl-2 pr-1 text-xs"></i>
          <span>{{ comic.favoriteCount }}</span>
        </div>
        <div class="w-4/5 grid grid-cols-3 gap-3">
          <template v-for="tag in comic.tags">
            <button class="btn btn-secondary btn-sm whitespace-nowrap px-4 place-items-center">
              {{ tag }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
