<script setup>
import { ref } from 'vue'

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
}

const res = ref('')

;(async function () {
  res.value = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
})()
</script>

<template>
  {{ res }}
</template>

<style scoped></style>
