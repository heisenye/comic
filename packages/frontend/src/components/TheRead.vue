<script>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { TheImage } from 'ui'
import { BASE_URL } from 'common'

const widthToClass = {
  50: 'w-1/2',
  60: 'w-3/5',
  70: 'w-[70%]',
  80: 'w-4/5',
  90: 'w-[90%]',
  100: 'w-full'
}

export default {
  name: 'TheRead',
  components: { TheImage },
  props: {
    pages: {
      type: Number,
      required: true
    },
    imageWidth: {
      type: String,
      default: '100'
    }
  },
  setup(props) {
    const route = useRoute()
    const { id, chapter } = route.params

    const hours = ref(0)
    const minutes = ref('0')
    const comicPageList = Array.from({ length: props.pages }, (v, k) => `${k + 1}.webp`)
    const comicPages = ref([])

    const updateTime = () => {
      const now = new Date()
      hours.value = now.getHours()
      minutes.value = now.getMinutes().toString().padStart(2, '0')
    }
    updateTime()
    setInterval(updateTime, 20000)

    const imageWidthClass = computed(() => {
      return widthToClass[props.imageWidth]
    })

    const currentPage = ref('p1')
    watch(currentPage, (newVal) => {
      localStorage.setItem(`${id}-${chapter}`, String(newVal))
    })

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 1) {
            currentPage.value = entry.target.id
          }
        })
      },
      {
        threshold: 1
      }
    )

    onMounted(() => {
      comicPages.value.forEach((page) => {
        observer.observe(page)
      })
    })

    onUnmounted(() => {
      comicPages.value.forEach((page) => {
        observer.unobserve(page)
      })
    })

    return {
      BASE_URL,
      comicPageList,
      id,
      chapter,
      hours,
      minutes,
      imageWidthClass,
      comicPages
    }
  }
}
</script>

<template>
  <div
    ref="comicPages"
    v-for="(comicPage, index) in comicPageList"
    :key="comicPage"
    class="relative mx-auto top-20 px-4 my-3 max-w-xl"
    :id="`p${index + 1}`"
  >
    <TheImage
      :src="`${BASE_URL}/${id}/${chapter}/${comicPage}`"
      :lazy="true"
      :class="imageWidthClass"
      class="mx-auto"
    />
  </div>
  <span class="fixed bottom-0 left-0 px-2 rounded bg-black opacity-80 text-sm text-white">
    {{ hours }}:{{ minutes }}
  </span>
</template>
