<script>
import { onBeforeMount, ref } from 'vue'
import { goBook } from '@/utils/router'
import ComicRecommendation from '@/components/TheComicsRow.vue'
import { http } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'HomeView',
  components: { ComicRecommendation },
  setup() {
    const comicList = ref(null)

    onBeforeMount(async () => {
      try {
        const response = await http.getComics()
        if (response) {
          comicList.value = response.data.filter((comic) => comic.chapters !== 0)
        }
      } catch (error) {
        console.error(error)
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
