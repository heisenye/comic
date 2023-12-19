<script>
import { TheIcon } from 'ui'
export default {
  name: 'AboutView',
  components: { TheIcon },
  setup() {}
}
</script>

<template>
  <main class="absolute top-40 w-full px-4">
    <div class="card w-full bg-primary">
      <div class="card-body font-cn_2">
        <h1 class="text-xl text-center">兴趣使然的小站</h1>
        <div class="flex px-4 justify-between">
          <TheIcon type="vuejs" variant="brands" size="2xl" />
          <TheIcon type="node-js" variant="brands" size="2xl" />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
