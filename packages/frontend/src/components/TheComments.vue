<script>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { refresh } from '@/utils/router.js'
import TheComment from '@/components/TheComment.vue'
import { TheButton, TheIcon } from 'ui'
import { http, showMsg, msg, useToken } from 'common'

export default {
  name: 'TheComments',
  components: {
    TheButton,
    TheIcon,
    TheComment
  },
  setup() {
    const route = useRoute()
    const { id } = route.params

    const { token } = useToken
    const inputComment = ref('')
    const commentInputEl = ref(null)
    const isSubmitDisabled = computed(() => !inputComment.value)
    const isScrollButtonShow = ref(false)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isScrollButtonShow.value = !entry.isIntersecting
        })
      },
      {
        root: null,
        rootMargin: '0px 0px 9999px 0px'
      }
    )
    const comments = ref([])
    onMounted(async () => {
      const response = await http.getComicComments(id)
      if (response && response.code === 200) {
        comments.value = response.data
      }
      observer.observe(commentInputEl.value)
    })
    onUnmounted(() => {
      observer.disconnect()
    })

    const commentSubmitHandler = async () => {
      const response = await http.postComicComment({ id, content: inputComment.value })
      if (response && response.code === 200) {
        showMsg({
          msg: msg['SUBMIT_COMMENT_SUCCESS'],
          messageType: 'success',
          popupType: 'toast',
          toastPos: ['bottom', 'right']
        }) // showMsg
        setTimeout(() => {
          refresh()
        }, 1000) // setTimeout
      } // if
    }

    const scrollToCommentInputEl = () => {
      commentInputEl.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return {
      token,
      inputComment,
      commentInputEl,
      isSubmitDisabled,
      isScrollButtonShow,
      comments,
      commentSubmitHandler,
      scrollToCommentInputEl
    }
  }
}
</script>

<template>
  <main class="relative top-4 w-full mx-auto px-4 pb-4 card rounded max-w-3xl bg-primary">
    <h1 class="text-xl mt-6 mb-8 text-center font-base font-black">评论</h1>
    <RouterLink
      v-if="!token"
      :to="{ name: 'login' }"
      class="text-xs link-info link-hover self-center font-base mb-3"
      >当前未登录,立即登录</RouterLink
    >
    <textarea
      ref="commentInputEl"
      :disabled="!token"
      v-model="inputComment"
      placeholder="输入评论"
      rows="3"
      class="textarea textarea-secondary text-accent-content mb-4"
    ></textarea>
    <TheButton
      type="neutral"
      :disabled="isSubmitDisabled"
      class="h-10 w-20 self-end font-base"
      @click="commentSubmitHandler"
      >提交</TheButton
    >
    <template v-for="comment in comments">
      <TheComment :comment="comment" />
    </template>
  </main>
  <Transition>
    <TheButton
      v-show="isScrollButtonShow"
      type="info"
      shape="circle"
      style="translate: -50% 0"
      class="fixed top-20 left-1/2 shadow-md shadow-info"
      @click="scrollToCommentInputEl"
    >
      <TheIcon type="arrow-up" />
    </TheButton>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(0, -100%);
}
</style>
