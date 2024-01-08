<script>
import { ref, watch, reactive } from 'vue'
import { TheButton, TheIcon, TheNavigation } from 'ui'
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'IndexNavigation',
  components: { TheButton, TheIcon, TheNavigation, RouterLink },
  setup() {
    const menuItems = reactive([
      {
        text: '用户管理',
        icon: 'user-gear',
        to: 'user-management',
        active: false
      },
      {
        text: '漫画管理',
        icon: 'gears',
        to: 'comic-management',
        active: true
      }
    ])

    const menu = ref(null)
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const openMenu = () => {
      isMenuOpen.value = true
    }

    const setMenuActive = (to) => {
      menuItems.forEach((item) => {
        item.active = item.to === to
      })
    }

    watch(isMenuOpen, (newVal) => {
      if (newVal) {
        menu.value.classList.remove('-translate-x-40')
      } else {
        menu.value.classList.add('-translate-x-40')
      }
    })
    return {
      menu,
      menuItems,
      isMenuOpen,

      toggleMenu,
      openMenu,
      setMenuActive
    }
  }
}
</script>

<template>
  <main class="relative w-full">
    <TheNavigation class="bg-primary h-16 z-10">
      <template #left>
        <TheButton
          type="ghost"
          shape="circle"
          size="base"
          :transition="true"
          @click="openMenu"
          class="text-white"
        >
          <TheIcon type="bars" size="xl" />
        </TheButton>
      </template>
    </TheNavigation>
    <aside
      class="relative z-50 h-screen w-40 bg-white -translate-x-40 transition-all duration-300"
      ref="menu"
    >
      <div class="py-6 h-full flex flex-col items-center gap-4 font-Noto">
        <h1 class="text-xl font-medium tracking-wider">MewAcg</h1>
        <div class="w-full mt-4 space-y-8">
          <div class="flex" v-for="item in menuItems" :key="item.to">
            <span class="bg-secondary w-1 self-stretch" v-show="item.active"></span>
            <RouterLink
              @click="
                () => {
                  openMenu
                  setMenuActive(item.to)
                }
              "
              :to="{ name: item.to }"
              class="justify-center w-full flex gap-3 pr-4"
            >
              <TheIcon :type="item.icon" class="text-black xl:text-lg 3xl:text-xl" />
              <span class="xl:text-base font-medium">{{ item.text }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </aside>
    <Teleport to="body">
      <Transition name="bg">
        <div
          class="fixed w-full h-full inset-0 bg-black opacity-50"
          v-show="isMenuOpen"
          @click="toggleMenu"
        ></div>
      </Transition>
    </Teleport>
  </main>
</template>

<style>
.bg-enter-active,
.bg-leave-active {
  transition: opacity 0.5s;
}

.bg-enter-from,
.bg-leave-to {
  opacity: 0;
}
</style>
