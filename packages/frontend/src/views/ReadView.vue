<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TheImage, TheNavigation, TheIcon, TheButton, TheModal } from 'ui'
import { http } from 'common'
import { BASE_URL } from 'common'

export default {
  name: 'ReadView',
  components: { TheNavigation, TheImage, TheIcon,TheButton, TheModal },
  setup() {
    const route = useRoute()

    const { id, chapter } = route.params
    const nav = ref(null)
    const pages = ref(0)
    const comicPageFilenames = ref([])
    const isScrollingDown = ref(false)
    const imageWidth = ref("100")

    let lastScrollPos = 0
    const scrollFn = () => {
      const currentScrollPos = window.scrollY
      currentScrollPos - lastScrollPos > 0
        ? (isScrollingDown.value = true)
        : (isScrollingDown.value = false)
      lastScrollPos = currentScrollPos
    }



    onMounted(async () => {
      try {
        const response = await http.getComicChapter(id, chapter)
        pages.value = response.data.pages
        // comicPageFilenames.value = Array.from({ length: pages.value }, (v, k) => `${k + 1}.webp`)
        comicPageFilenames.value.push(...Array.from({ length: pages.value }, (v, k) => `${k + 1}.webp`))
      } catch (error) {
        console.error(error)
      }
      window.addEventListener("scroll", scrollFn)
    })

    onUnmounted(() => {
      window.removeEventListener("scroll", scrollFn)
    })

    const hours = ref(0)
    const minutes = ref(0)

    const updateTime = () => {
      const now = new Date()
      hours.value = now.getHours()
      minutes.value = now.getMinutes()
    }
    updateTime()
    setInterval(updateTime, 20000)

    const widthToPercent = {
      "50": "w-1/2",
      "60": "w-3/5",
      "70": "w-[70%]",
      "80": "w-4/5",
      "90": "w-[90%]",
      "100": "w-full",
    }

    const imageWidthClass = computed(() => {
      return widthToPercent[imageWidth.value]
    })

    return {
      BASE_URL,
      nav,
      comicPageFilenames,
      id,
      chapter,
      isScrollingDown,
      hours, minutes,
      imageWidth,
      imageWidthClass
    }
  }
}
</script>

<template>
  <main class="relative">
    <TheNavigation :class="{'-translate-y-16': isScrollingDown}" class="z-50 transition-all shadow-md shadow-primary">
      <template #left>
        <router-link :to="{ name: 'book' }" class="relative btn btn-ghost text-white" replace>
          <TheIcon type="arrow-left" size="lg" class="xl:text-xl 2xl:text-2xl"/>
        </router-link>
      </template>
      <template #right>
        <TheButton type="ghost" shape="circle" size="md" onclick="document.getElementById('resizeImage').showModal()">
          <TheIcon type="magnifying-glass-plus" size="lg" class="xl:text-xl 2xl:text-2xl text-white" />
        </TheButton>
        <TheModal id="resizeImage" class="fixed top-0">
          <input type="range" min="50" max="200" value="100" step="10" class="range range-info range-xs" v-model="imageWidth">
          <div class="w-full flex justify-between text-xs px-1">
            <span>|</span>
            <span>|</span>
            <span></span>
            <span>|</span>
          </div>
        </TheModal>
      </template>
    </TheNavigation>
    <div
      v-for="filename in comicPageFilenames"
      :key="filename"
      class="relative top-20 px-4 my-3 max-w-lg w-full mx-auto"

    >
      <TheImage
        :src="`${BASE_URL}/${id}/${chapter}/${filename}`"
        :alt="filename"
        :lazy="true"
        class="mx-auto"
        :class="imageWidthClass"
      />
    </div>
    <span class="fixed bottom-0 left-0 px-2 rounded bg-black opacity-80 text-sm text-white" >
      {{ hours }}:{{ minutes }}
    </span>
  </main>
</template>