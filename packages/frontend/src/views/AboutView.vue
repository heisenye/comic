<script>
import { TheIcon } from 'ui'
export default {
  name: 'AboutView',
  components: { TheIcon },
  setup() {}
}
</script>

<template>
  <main class="relative top-40 mx-auto max-w-screen-xl w-full px-4">
    <div class="card w-full bg-primary font-Noto">
      <div class="card-body ">
        <h1 class="text-center text-xl font-base_2 xl:font-base_3">兴趣使然的小站</h1>
        <div class="flex px-4 justify-between">
          <TheIcon type="vuejs" variant="brands" size="2xl" class="xl:text-3xl"/>
          <TheIcon type="node-js" variant="brands" size="2xl" class="xl:text-3xl"/>
        </div>
      </div>
    </div>
  </main>
</template>