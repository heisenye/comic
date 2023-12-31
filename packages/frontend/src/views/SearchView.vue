<script>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { goBack, goSearchResult } from '@/utils/router'
import TheComics from '@/components/TheComics.vue'
import { TheButton, TheIcon, TheNavigation } from 'ui'
import { http } from 'common'

export default {
  name: 'SearchView',
  components: { TheButton, TheIcon, TheComics, TheNavigation },
  setup() {
    const route = useRoute()

    const keyword = route.query.keyword ? ref(route.query.keyword) : ref('')
    const isSearchDisabled = computed(() => !keyword.value.trim())
    const searchComics = ref([])

    watch(
      () => route.query.keyword,
      (newKeyword) => {
        keyword.value = String(newKeyword)
      }
    )

    onMounted(async () => {
      if (keyword.value.trim()) {
        const response = await http.getSearch(keyword.value)
        searchComics.value = response.data
      }
    })

    const searchFn = () => {
      if (keyword.value.trim()) {
        goSearchResult(keyword.value)
      }
    }

    return {
      goBack,
      keyword,
      isSearchDisabled,
      searchComics,

      searchFn
    }
  }
}
</script>

<template>
  <main>
    <TheNavigation>
      <template #left>
        <button
          class="text-white btn btn-sm btn-ghost tracking-wider font-medium text-lg px-4"
          @click="goBack"
        >
          <span class="text-2xl">&lt;</span>
        </button>
      </template>
      <template #right>
        <div class="relative flex-grow flex items-center pr-2 font-Noto">
          <input
            type="text"
            placeholder="搜索标题或标签"
            class="nav-input"
            v-model="keyword"
            @keyup.enter="searchFn"
          />
          <TheIcon type="magnifying-glass" class="absolute left-4" />
          <TheButton
            shape="circle"
            type="error"
            :disabled="isSearchDisabled"
            class="absolute right-4 size-6"
          >
            <TheIcon
              size="sm"
              type="arrow-right"
              class="text-base"
              :class="{ 'text-white': !isSearchDisabled }"
              @click="searchFn"
            />
          </TheButton>
        </div>
        <router-link :to="{ name: 'home' }" class="relative btn btn-info btn-circle text-white">
          <TheIcon type="house" class="lg:text-lg xl:text-xl 2xl:text-2xl"></TheIcon>
        </router-link>
      </template>
    </TheNavigation>
    <h1
      class="absolute top-44 text-xl text-center w-full text-white font-base_3"
      v-if="searchComics.length === 0 && $route.query.keyword"
    >
      什么也没有找见
    </h1>
    <TheComics class="top-20" v-if="searchComics" :comic-list="searchComics" />
  </main>
</template>
