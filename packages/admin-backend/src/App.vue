<script setup>
import { RouterView } from 'vue-router'
import IndexNavigation from '@/components/IndexNavigation.vue'
</script>

<template>
  <IndexNavigation v-if="$route.meta.showNav" />

  <RouterView />
</template>
