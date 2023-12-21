<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TheImage, TheNavigation, TheIcon, TheButton, TheModal } from 'ui'
import { http } from 'common'
import TheRead from '@/components/TheRead.vue'

export default {
  name: 'ReadView',
  components: { TheRead, TheNavigation, TheImage, TheIcon, TheButton, TheModal },
  setup() {
    const route = useRoute()

    const { id, chapter } = route.params
    const pages = ref(0)
    const isScrollingDown = ref(false)
    const imageWidth = ref('100')

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
      } catch (error) {
        console.error(error)
      }
      window.addEventListener('scroll', scrollFn)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollFn)
    })

    return {
      pages,
      isScrollingDown,
      imageWidth
    }
  }
}
</script>

<template>
  <main class="relative">
    <TheNavigation
      :class="{ '-translate-y-16': isScrollingDown }"
      class="z-50 transition-all shadow-md shadow-primary duration-500"
    >
      <template #left>
        <router-link :to="{ name: 'book' }" class="relative btn btn-ghost text-white" replace>
          <TheIcon type="arrow-left" size="lg" class="xl:text-xl 2xl:text-2xl" />
        </router-link>
      </template>
      <template #right>
        <TheButton
          type="ghost"
          shape="circle"
          size="md"
          onclick="document.getElementById('resizeImage').showModal()"
        >
          <TheIcon
            type="magnifying-glass-plus"
            size="lg"
            class="xl:text-xl 2xl:text-2xl text-white"
          />
        </TheButton>
        <TheModal id="resizeImage" class="fixed top-0">
          <input
            type="range"
            min="50"
            max="100"
            value="100"
            step="10"
            class="range range-info range-xs"
            v-model="imageWidth"
          />
          <div class="w-full flex justify-between text-xs px-1">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </TheModal>
        <router-link :to="{ name: 'home' }" class="relative btn btn-ghost btn-circle text-white">
          <TheIcon type="house" size="lg" class="xl:text-xl 2xl:text-2xl"></TheIcon>
        </router-link>
      </template>
    </TheNavigation>
    <TheRead v-if="pages" :pages="pages" :image-width="imageWidth" />
  </main>
</template>
