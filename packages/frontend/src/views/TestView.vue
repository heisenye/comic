<script>
import { TheModal } from 'ui'
import TheTest from '@/components/TheTest.vue'
import { onMounted, ref } from 'vue'

export default {
  components: { TheModal, TheTest },
  setup() {
    const searchText = ref('')
    const val = ref(null)

    onMounted(() => {})

    return {
      searchText,
      val
    }
  }
}
</script>

<template>
  <TheTest> </TheTest>
</template>

<style scoped></style>
