<script>
import { RouterView } from 'vue-router'
import IndexNavigation from '@/components/IndexNavigation.vue'

export default {
  name: 'App',
  components: {
    IndexNavigation,
    RouterView
  }
}
</script>

<template>
  <transition name="component" mode="out-in">
    <IndexNavigation v-if="$route.meta.showNav" class="z-50" />
  </transition>
  <RouterView v-slot="{ Component }">
    <transition name="component" mode="out-in">
      <!--      <keep-alive>-->
      <component :is="Component" :key="$route.fullPath" class="z-0"></component>
      <!--      </keep-alive>-->
    </transition>
  </RouterView>
</template>

<style scoped>
.component-enter-active,
.component-leave-active {
  transition: opacity ease-in-out 0.15s;
}

.component-enter-from,
.component-leave-to {
  opacity: 0;
}
</style>
