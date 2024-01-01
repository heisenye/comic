<script>
import { onMounted, ref } from 'vue'
import TheComics from '@/components/TheComics.vue'
import { goBook } from '@/utils/router'
import { TheImage } from 'ui'
import { http, BASE_URL } from 'common'

export default {
  name: 'FavoriteView',
  components: { TheComics, TheImage },
  setup() {
    const favoriteComics = ref([])

    onMounted(async () => {
      const response = await http.getFavoriteComics()
      if (response.code === 200) {
        favoriteComics.value = response.data
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
  <TheComics class="top-40" :comic-list="favoriteComics" />
</template>
