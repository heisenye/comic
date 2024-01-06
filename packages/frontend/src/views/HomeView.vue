<script>
import { onBeforeMount, ref } from 'vue'
import { goBook } from '@/utils/router'
import ComicRecommendation from '@/components/TheComicsRow.vue'
import { http, BASE_URL } from 'common'

export default {
  name: 'HomeView',
  components: { ComicRecommendation },
  setup() {
    const comicList = ref(null)

    onBeforeMount(async () => {
      const response = await http.getComics()
      if (response) {
        comicList.value = response.data.filter((comic) => comic.chapters !== 0)
      }
    })

    return {
      BASE_URL,
      comicList,

      goBook
    }
  }
}
</script>

<template>
  <ComicRecommendation class="top-44" v-if="comicList" :comic-list="comicList" />
</template>
