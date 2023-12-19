<script setup>
import {ref} from "vue"
import { RouterView } from 'vue-router'
import IndexNavigation from '@/components/IndexNavigation.vue'

const isAsideOpen = ref(false)

const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value
}

</script>

<template>
  <IndexNavigation :is-aside-open="isAsideOpen" @open="toggleAside" v-if="$route.meta.showNav"/>
  <div
        class="w-full h-full absolute inset-0 z-10 bg-black opacity-50 transition-all duration-300"
        v-show="isAsideOpen" @click="toggleAside"
  >
  </div>
  <RouterView/>
</template>
