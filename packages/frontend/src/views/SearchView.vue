<script>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { goBack, goSearchResult } from '@/utils/router'
import TheComics from '@/components/TheComics.vue'
import { TheNavigation } from 'ui'
import { http } from 'common'


export default {
  name: 'SearchView',
  components: { TheComics, TheNavigation },
  setup() {
    const route = useRoute()

    const keyword = route.query.keyword ? ref(route.query.keyword) : ref('')
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
        <div class="relative flex-grow flex items-center pr-2 font-cn_3">
            <input
              type="text"
              placeholder="搜索标题或标签"
              class="comic-input"
              v-model="keyword"
              @keyup.enter="searchFn"
            />
            <i class="fa-solid fa-magnifying-glass absolute left-4"></i>
        </div>
        <button class="btn btn-info btn-sm rounded-md text-white font-cn_2" @click="searchFn">
          搜寻
        </button>
      </template>
    </TheNavigation>
    <h1
      class="absolute top-44 text-xl text-center w-full text-white font-cn_3"
      v-if="searchComics.length === 0 && $route.query.keyword"
    >
      什么也没有找见
    </h1>
    <TheComics class="top-20" v-if="searchComics" :comic-list="searchComics" />
  </main>
</template>
