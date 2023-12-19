<script>
import { computed } from 'vue'
import clsx from 'clsx'

const sizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

export default {
  name: 'TheIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'base'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  setup(props) {
    const iconClass = computed(() =>
      clsx('fa-' + props.type, 'fa-' + props.variant, sizeClasses[props.size])
    )
    return {
      iconClass
    }
  }
}
</script>

<template>
  <i :class="iconClass"></i>
</template>
