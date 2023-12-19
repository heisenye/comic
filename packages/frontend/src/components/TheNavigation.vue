<script>
import { goBack } from '@/utils/router'
import { goHome } from '@/utils/router'
import { goSearch } from '@/utils/router'

export default {
  name: 'TheNavigation',
  setup() {
    return {
      goBack,
      goHome,
      goSearch
    }
  }
}
</script>

<template>
  <header class="navbar bg-primary fixed top-0 flex justify-between min-w-[300px]">
    <div class="relative left-0 flex">
      <slot name="left" :goBack="goBack"></slot>
    </div>
    <div class="relative flex flex-grow justify-end gap-1 lg:gap-1.5 px-2 items-center">
      <slot name="right" :goHome="goHome" :goSearch="goSearch"></slot>
    </div>
  </header>
</template>
