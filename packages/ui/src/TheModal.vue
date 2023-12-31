<script>
import TheButton from "./TheButton.vue"
import TheIcon from "./TheIcon.vue"

export default {
  name: "TheModal",
  components: {TheButton, TheIcon},
  props: {
    id: {
      type: String,
      default: "modal"
    },
  },
}
</script>

<template>
  <teleport to="body">
    <dialog :id="id" class="modal font-Noto">
      <div class="modal-box" v-bind="$attrs">
        <slot></slot>
        <form method="dialog">
          <TheButton type="ghost" size="sm" shape="circle" class="absolute right-1 top-1">
            <TheIcon type="xmark-circle" size="lg" class="xl:text-xl 2xl:text-2xl"/>
          </TheButton>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  </teleport>
</template>