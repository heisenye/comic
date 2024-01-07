<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { goBack, goHome } from '@/utils/router'
import TheBook from '@/components/TheBook.vue'
import { TheNavigation, TheButton, TheIcon } from 'ui'
import { http } from 'common'

export default {
  name: 'BookView',
  components: { TheBook, TheNavigation, TheButton, TheIcon },
  setup() {
    const route = useRoute()
    const { id } = route.params

    const comic = ref(null)

    onMounted(async () => {
      const response = await http.getComic(id)
      if (response.code === 200) {
        comic.value = response.data
      }
    })
    return {
      comic,

      goBack,
      goHome
    }
  }
}
</script>

<template>
  <main>
    <TheNavigation class="z-50 shadow-md shadow-primary">
      <template #left>
        <div
          class="text-white btn btn-ghost tracking-wider font-medium text-lg px-4"
          @click="goBack"
        >
          <span class="text-xl 2xl:text-2xl 2xl:tracking-wider">&lt;&nbsp;&nbsp;Back</span>
        </div>
      </template>
      <template #right>
        <div class="nav-input-container">
          <input type="text" placeholder="搜索标题或标签" class="nav-input" />
          <TheIcon type="magnifying-glass" class="absolute left-4" />
        </div>
        <TheButton type="ghost" size="md" shape="circle" class="lg:hidden btn-md text-white">
          <TheIcon
            type="magnifying-glass"
            class="text-base sm:text-lg xl:text-xl 2xl:text-2xl lg:hidden"
          />
        </TheButton>
        <TheButton type="ghost" size="md" shape="circle" class="btn-md text-white" @click="goHome">
          <TheIcon type="house" class="text-base sm:text-lg xl:text-xl 2xl:text-2xl" />
        </TheButton>
      </template>
    </TheNavigation>
    <TheBook v-if="comic" :comic="comic" class="z-0" />
  </main>
</template>
