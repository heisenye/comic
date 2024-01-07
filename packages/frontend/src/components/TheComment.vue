<script>
import { TheImage, TheIcon } from 'ui'
import { BASE_URL } from 'common'

export default {
  name: 'TheComment',
  components: { TheImage, TheIcon },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { content, createdAt, likes, userId } = props.comment
    const { _id: uid, username } = userId

    return {
      uid,
      username,
      createdAt,
      content,
      likes,
      BASE_URL
    }
  }
}
</script>

<template>
  <div class="divider divider-neutral"></div>
  <main class="navbar px-0 gap-x-3">
    <div class="flex-none size-12 rounded-full bg-primary overflow-hidden">
      <TheImage
        :blur="false"
        class="size-full rounded-full z-10 border-2 border-neutral"
        :src="`${BASE_URL}/avatar/${uid}.webp`"
      />
    </div>
    <div class="flex-1 flex-col items-start font-Noto">
      <h3 class="text-base text-white">{{ username }}</h3>
      <div class="text-xs text-accent-content">{{ new Date(createdAt).toLocaleString() }}</div>
      <p class="text-neutral-content">{{ content }}</p>
    </div>
    <div class="flex-none text-neutral-content">
      <TheIcon type="thumbs-up" />
      &nbsp;&nbsp;
      <span>{{ likes }}</span>
    </div>
  </main>
</template>
