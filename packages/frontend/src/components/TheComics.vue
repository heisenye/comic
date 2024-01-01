<script>
import { goBook } from '@/utils/router'
import { TheImage } from 'ui'
import { BASE_URL } from 'common'

export default {
  name: 'TheComics',
  components: { TheImage },
  props: {
    comicList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      BASE_URL,
      goBook
    }
  }
}
</script>

<template>
  <main
    class="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl min-w-[300px] space-y-4 text-white px-1"
  >
    <template v-for="comic in comicList" :key="comic._id">
      <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 inline-flex card px-4 md:px-3 lg:px-2">
        <TheImage
          :src="`${BASE_URL}/${comic._id}/${comic.coverImage.chapter}/${comic.coverImage.page}.webp`"
          :blur="false"
          class="cursor-pointer"
          @click="goBook(comic._id)"
        />
        <div class="card-body bg-primary rounded-b-2xl pt-4 px-4 pb-3">
          <h1
            class="font-base_2 font-medium text-sm text-center tracking-wide sm:text-base whitespace-nowrap"
          >
            {{ comic.name }}
          </h1>
          <span class="font-base_2 font-medium text-xs opacity-60">{{ comic.author }}</span>
          <div class="font-base_2 font-medium text-xs opacity-60 space-x-1">
            <i class="fa-solid fa-eye"></i>
            <span>{{ comic.viewCount }}</span
            >&nbsp;&nbsp;
            <i class="fa-solid fa-heart"></i>
            <span>{{ comic.favoriteCount }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
