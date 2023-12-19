<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TheImage } from 'ui'
import { http } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'ReadView',
  components: { TheImage },
  setup() {
    const route = useRoute()

    const { id, chapter } = route.params
    const pages = ref(0)
    const comicPageFilenames = ref(null)

    onMounted(async () => {
      try {
        const response = await http.getComicChapter(id, chapter)
        pages.value = response.data.pages
        comicPageFilenames.value = Array.from({ length: pages.value }, (v, k) => `${k + 1}.webp`)
      } catch (error) {
        console.error(error)
      }
    })
    return {
      BASE_URL,
      comicPageFilenames,
      id,
      chapter
    }
  }
}
</script>

<template>
  <main class="px-4">
    <div
      v-for="filename in comicPageFilenames"
      :key="filename"
      class="relative my-3 w-full max-w-lg mx-auto"
    >
      <TheImage
        :src="`${BASE_URL}/${id}/${chapter}/${filename}`"
        :alt="filename"
        :lazy="true"
        class="w-full"
      />
    </div>
  </main>
</template>
