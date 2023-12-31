<script>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { goLogin, goProfile, goSearch, goSearchResult } from '@/utils/router'
import TheAvatar from '@/components/TheAvatar.vue'
import { TheButton, TheIcon, TheNavigation } from 'ui'
import { useToken } from 'common'
import { BASE_URL } from 'common'

const links = [
  { name: 'home', zh: '主页' },
  { name: 'community', zh: '社区' },
  { name: 'about', zh: '关于' },
  { name: 'history', zh: '历史' },
  { name: 'favorite', zh: '收藏' }
]

export default {
  name: 'IndexNavigation',
  components: { TheButton, TheIcon, TheNavigation, RouterLink, TheAvatar },
  setup() {
    const route = useRoute()
    const { token } = useToken()

    const keyword = ref('')
    const isSearchDisabled = computed(() => !keyword.value.trim())
    const activeLinkIndex = ref(+sessionStorage.getItem('activeLinkIndex') || 0)
    const windowWidth = ref(window.innerWidth)

    watch(
      [activeLinkIndex, route],
      ([newActiveLinkIndex, newRoute]) => {
        sessionStorage.setItem('activeLinkIndex', String(newActiveLinkIndex))
        activeLinkIndex.value = links.findIndex((link) => link.name === newRoute.name)
      },
      {
        immediate: true
      }
    )

    const linkBottomPosition = computed(() => {
      if (windowWidth.value > 1024) {
        const gap = (768 - 60 * 5) / 6
        return {
          left: activeLinkIndex.value * (gap + 60) + gap + 'px'
        }
      }
      if (windowWidth.value > 600) {
        const gap = (600 - 56 * 5) / 6
        return { left: activeLinkIndex.value * (gap + 56) + gap + 'px' }
      } else {
        const gap = (windowWidth.value - 56 * 5) / 6
        return {
          left: activeLinkIndex.value * (gap + 56) + gap + 'px'
        }
      }
    })
    onMounted(() => {
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    })

    onUnmounted(() => {
      window.removeEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    })

    const searchFn = () => {
      if (keyword.value.trim()) {
        goSearchResult(keyword.value)
      }
    }

    return {
      BASE_URL,
      keyword,
      isSearchDisabled,
      links,
      linkBottomPosition,
      activeLinkIndex,
      token,

      goLogin,
      goProfile,
      goSearch,
      searchFn
    }
  }
}
</script>

<template>
  <main class="relative">
    <nav class="navbar bg-primary fixed top-16 min-w-[300px] font-base_2">
      <div
        class="absolute left-1/2 -translate-x-1/2 max-w-screen-lg 3xl:max-w-screen-xl w-full flex justify-evenly"
      >
        <template v-for="(link, index) in links" :key="link">
          <RouterLink
            :to="{ name: link.name }"
            class="link link-hover text-base xl:text-lg font-semibold px-3 py-1 font-base_2"
            :class="{ 'text-info': activeLinkIndex === index }"
            @click="() => (activeLinkIndex = index)"
            >{{ link.zh }}
          </RouterLink>
        </template>
        <span
          class="bg-info transition-all duration-300 ease-in-out absolute top-12 w-[60px] h-[2px]"
          :class="{ 'opacity-0': activeLinkIndex === -1 }"
          :style="linkBottomPosition"
        ></span>
      </div>
    </nav>
    <TheNavigation>
      <template #left>
        <RouterLink
          :to="{ name: 'home' }"
          class="relative btn btn-ghost tracking-wider font-medium rounded-lg font-Poppins normal-case overflow-hidden after:halo active:after:halo-active text-white"
        >
          <span class="text-xl 2xl:text-2xl 2xl:tracking-widest"> MewAcg </span>
        </RouterLink>
      </template>
      <template #right>
        <div class="nav-input-container">
          <input
            type="text"
            placeholder="搜索标题或标签"
            class="nav-input"
            @keyup.enter="searchFn"
            v-model="keyword"
          />
          <TheIcon type="magnifying-glass" class="absolute left-4" />
          <TheButton
            shape="circle"
            type="error"
            :disabled="isSearchDisabled"
            class="absolute right-4 size-6 xl:size-7 shadow-md"
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
        <TheButton type="ghost" size="md" shape="circle" class="lg:hidden text-white">
          <TheIcon
            type="magnifying-glass"
            class="text-base sm:text-lg lg:hidden"
            @click="goSearch"
          />
        </TheButton>
        <TheButton
          type="ghost"
          size="md"
          shape="circle"
          tooltip="消息"
          :transition="true"
          class="before:text-sm md:text-md text-white"
        >
          <TheIcon type="bell" size="lg" class="xl:text-xl 2xl:text-2xl" />
        </TheButton>
        <TheButton
          type="ghost"
          size="md"
          shape="square"
          tooltip="个人中心"
          :transition="true"
          class="before:text-xs md:before:text-sm"
          @click="token ? goProfile() : goLogin()"
        >
          <TheAvatar size="lg" class="sm:text-xl 2xl:text-2xl">
            <TheIcon
              type="user"
              size="lg"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white sm:text-lg xl:text-xl 2xl:text-2xl"
            />
          </TheAvatar>
        </TheButton>
      </template>
    </TheNavigation>
  </main>
</template>
