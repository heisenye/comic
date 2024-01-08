<script>
import { computed, ref } from 'vue'

export default {
  name: 'TheImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    lazy: {
      created(el, binding) {
        const { isLazy } = binding.value
        if (!isLazy) return (el.src = el.dataset.src)

        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = el.dataset.src
                el.setAttribute('src', img)
                observer.unobserve(el)
              }
            })
          }, {
            root: null,
            rootMargin: '100px 0px 20px 0px'
          }
        )
        observer.observe(el)
      }
    }
  },
  setup(props) {
    const isLoaded = ref(false)
    const { blur } = props

    const imgClassName = computed(() => ({
      'opacity-100': isLoaded.value,
      'opacity-0': !isLoaded.value
    }))

    const imgContainerClassName = computed(() => ({
      'before:placeholder': !isLoaded.value,
      'before:blur-md': !isLoaded.value && blur,
      'aspect-3/4': !isLoaded.value,
      'aspect-auto': isLoaded.value,
    }))

    return {
      isLoaded,
      imgClassName,
      imgContainerClassName,
    }
  }
}
</script>

<template>
  <figure :class="['relative', 'overflow-hidden', imgContainerClassName]">
    <img
      v-lazy="{ isLazy: lazy }"
      :data-src="src"
      :alt="alt"
      @load="() => isLoaded = true"
      class="transition-opacity ease-out"
      :class="[imgClassName]"
    />
  </figure>
</template>
