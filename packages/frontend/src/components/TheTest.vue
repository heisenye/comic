<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { TheImage } from 'ui'
import { BASE_URL } from 'common'

export default {
  name: 'TheTest',
  components: { TheImage },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      BASE_URL
    }
  },
  mounted() {
    // const root = this.$refs.root
    // this.rootEle = root.children[0]
  }
}
</script>

<template>
  <div>
    <div class="scroll-auto">
      <input
        class="input"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="absolute top-[900px] w-1/2">
        <TheImage class="" :src="`${BASE_URL}/64d4e7a7cccc4bf7d491a7e6/1/1.webp`" />
      </div>
      <h1 class="absolute top-[2000px]">hello</h1>
    </div>
  </div>
</template>
