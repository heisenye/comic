<script>
import {ref, watch, reactive} from 'vue'
import { TheButton, TheIcon, TheNavigation } from 'ui'
import { RouterLink, RouterView } from "vue-router"


export default {
  name: 'IndexNavigation',
  components: {TheButton, TheIcon, TheNavigation, RouterLink },
  props: {
    isAsideOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const aside = ref(null)
    const isAsideOpen = ref(props.isAsideOpen)

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

    const openMenu = () => {
      isAsideOpen.value = true
      emit('open')
    }

    const setMenuActive = (to) => {
      menuItems.forEach(item => {
        item.active = item.to === to
      })
    }

    watch(() => props.isAsideOpen, (newVal) => {
      if (newVal) {
        aside.value.classList.remove('-translate-x-40')
      } else {
        aside.value.classList.add('-translate-x-40')
      }
    })
    return {
      aside,
      menuItems,
      isAsideOpen,

      openMenu,
      setMenuActive
    }
  }
}
</script>

<template>
  <main class="relative w-full">
    <TheNavigation class="bg-primary h-16 z-10" >
      <template #left>
        <TheButton type="ghost" shape="circle" size="base" :transition="true" @click="openMenu" class="text-white">
          <TheIcon type="bars" size="xl" />
        </TheButton>
      </template>
    </TheNavigation>
    <aside
      class="relative z-50 h-screen w-40 bg-white -translate-x-40 transition-all duration-300"
      ref="aside"
    >
      <div class="py-6 h-full flex flex-col items-center gap-4 font-Noto">
        <h1 class="text-xl font-medium tracking-wider">Heisenye</h1>
         <div class="w-full mt-4 space-y-8">
             <div class="flex" v-for="item in menuItems" :key="item.to">
                <span class="bg-secondary w-1 self-stretch" v-show="item.active"></span>
                <RouterLink @click="()=>{openMenu; setMenuActive(item.to)}" :to="{name: item.to}" class="justify-center w-full flex gap-3 pr-4" >
                  <TheIcon :type="item.icon" class="text-black xl:text-lg 3xl:text-xl"  />
                  <span class="xl:text-base font-medium">{{ item.text }}</span>
                </RouterLink>
             </div>
          </div>
      </div>
    </aside>
  </main>
</template>
