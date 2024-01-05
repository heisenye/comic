<script>
import { computed } from 'vue'
import clsx from 'clsx'
const typeClasses = {
  info: 'btn-info',
  error: 'btn-error',
  warning: 'btn-warning',
  success: 'btn-success',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  neutral: 'btn-neutral',
}


const sizeClasses = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
  wide: 'btn-wide'
}

const shapeClasses = {
  circle: 'btn-circle',
  square: 'btn-square'
}

const defaultClasses = ['btn', 'min-h-0', 'cursor-pointer']

export default {
  name: 'TheButton',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    size: {
      type: String,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String
    },
    tooltip: {
      type: String
    },
    transition: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const buttonClass = computed(() =>
      clsx(
        typeClasses[props.type],
        sizeClasses[props.size],
        shapeClasses[props.shape],
        defaultClasses,
        { 'btn-disabled': props.disabled },
        { 'cursor-not-allowed': props.disabled },
        { 'tooltip tooltip-bottom tooltip-secondary font-normal font-base': props.tooltip },
        {
          'transition-all duration-300 ease-in-out before:circle-splash before:active:circle-splash-active':
            props.transition
        }
      )
    )
    return {
      buttonClass
    }
  }
}
</script>

<template>
  <button :class="buttonClass" v-bind="{ 'data-tip': tooltip }">
    <slot></slot>
  </button>
</template>

