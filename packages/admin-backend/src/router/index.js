import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: HomeView,
      meta: {
        showNav: true
      }
    },
    {
      path: '/admin/comic',
      name: 'comic-management',
      component: () => import('../views/ComicManagementView.vue'),
      meta: {
        showNav: true
      }
    },
    {
      path: '/admin/user',
      name: 'user-management',
      component: () => import('../views/UserManagementView.vue'),
      meta: {
        showNav: true
      }
    },
    {
      path: '/admin/comic/:id',
      name: 'comic-detail',
      component: () => import('../views/ComicDetailView.vue'),
      meta: {
        showNav: false
      }
    }
  ]
})
export default router
