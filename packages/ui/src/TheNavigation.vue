<script>
export default {
  name: 'TheNavigation'
}
</script>

<template>
  <header class="fixed top-0 pl-4 navbar bg-primary">
    <div class="relative mx-auto flex justify-between min-w-[300px] w-full max-w-screen-6xl">
      <div class="relative left-0 flex">
        <slot name="left"></slot>
      </div>
      <div class="relative flex flex-grow justify-end gap-1 md:gap-2.5 lg:gap-0 xl:gap-4 2xl:gap-6 px-2 items-center">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>
