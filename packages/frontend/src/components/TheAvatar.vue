<script>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { BASE_URL } from 'common'
import clsx from 'clsx'

const sizeClass = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

export default {
  name: 'TheAvatar',
  components: {},
  props: {
    size: {
      type: String,
      default: 'base'
    }
  },
  setup(props) {
    const userStore = useUserStore()

    const isLoaded = ref(false)
    const isFailed = ref(false)
    const avatar = ref('')

    const imgClass = computed(() => ({
      'opacity-100': isLoaded.value,
      'opacity-0': !isLoaded.value
    }))

    const iconClass = computed(() =>
      clsx(
        'fa-solid fa-user absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white',
        sizeClass[props.size]
      )
    )

    const getAvatarFailed = () => {
      isLoaded.value = true
      isFailed.value = true
    }

    const user = storeToRefs(userStore)
    const { id } = user

    if (id) {
      avatar.value = `${id.value}.webp`
    }

    return {
      id,
      avatar,
      isLoaded,
      isFailed,
      imgClass,
      iconClass,
      getAvatarFailed,
      BASE_URL
    }
  }
}
</script>

<template>
  <div class="avatar w-full h-full cursor-pointer">
    <div class="relative rounded-full z-50" :class="{ 'before:placeholder': !isLoaded && id }">
      <template v-if="!id || isFailed">
        <slot>
          <i :class="iconClass"></i>
        </slot>
      </template>
      <img
        :src="`${BASE_URL}/avatar/${avatar}`"
        alt=""
        v-if="id && !isFailed"
        class="w-full h-full"
        :class="imgClass"
        @load="() => (isLoaded = true)"
        @error="getAvatarFailed"
      />
    </div>
  </div>
</template>
