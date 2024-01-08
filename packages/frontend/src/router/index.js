import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useHistory from '@/utils/useHistory.js'
import { useToken, showMsg, msg } from 'common'

const { token } = useToken
const { storeHistoryToStorage } = useHistory

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      showNav: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      showNav: true
    }
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('../views/CommunityView.vue'),
    meta: {
      showNav: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
    meta: {
      showNav: true
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('../views/FavoriteView.vue'),
    meta: {
      showNav: true
    },
    beforeEnter: (to, from, next) => {
      token.value
        ? next()
        : showMsg({
            msg: msg['NO_TOKEN'],
            messageType: 'info',
            popupType: 'alert'
          })
    }
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/BookView.vue'),
    meta: {
      showNav: false,
      isProgressRemembered: true
    },
    beforeEnter: (to, from, next) => {
      storeHistoryToStorage(to.params.id)
      to.meta.isProgressRemembered = 'true' === localStorage.getItem('isProgressRemembered')
      next()
    }
  },
  {
    path: '/read/:id/:chapter',
    name: 'read',
    component: () => import('../views/ReadView.vue'),
    meta: {
      showNav: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login-RegisterView.vue'),
    meta: {
      showNav: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Login-RegisterView.vue'),
    meta: {
      showNav: false
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      showNav: true
    },
    beforeEnter: (to, from, next) => {
      token.value
        ? next()
        : showMsg({
            msg: msg['NO_TOKEN'],
            messageType: 'info',
            popupType: 'toast'
          })
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: {
      showNav: false
    }
  }
]

if (import.meta.env.MODE === 'development') {
  routes.push({
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  })
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.name === 'read' && from.meta['isProgressRemembered']) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 120) //setTimeout
      const { id, chapter } = to.params
      const ele = localStorage.getItem(`${id}-${chapter}`)
      if (ele) {
        return new Promise((resolve) => {
          setTimeout(() => {
            showMsg({
              msg: msg['REACHED_LAST_WATCHED_POSITION'],
              messageType: 'success',
              popupType: 'toast'
            }) //showMsg
            resolve({
              el: `#${ele}`,
              top: 10,
              behavior: 'smooth'
            }) // resolve
          }, 1000) //setTimeout
        }) //Promise
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            top: 0
          }) //resolve
        }, 120) //setTimeout
      }) //Promise
    }
  }
})

export default router
