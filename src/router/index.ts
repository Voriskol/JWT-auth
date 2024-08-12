import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import SigninView from '@/views/SigninView.vue'
import GoodsView from '@/views/GoodsView.vue'
// Создание роутов
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
      meta: {
        auth: false
      }
    },
    {
      path: '/goods',
      name: 'goods',
      component: GoodsView,
      meta: {
        auth: true
      }
    }
  ]
})
// Защита роутов
router.beforeEach((to, from, next) => {
  const authSore = useAuthStore()
  if (to.meta.auth && !authSore.userInfo.token) {
    next('/signin')
  } else if (!to.meta.auth && authSore.userInfo.token) {
    next('/goods')
  } else {
    next()
  }
})

export default router
