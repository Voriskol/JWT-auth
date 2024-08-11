import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import SigninView from '@/views/SigninView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    }
    // {
    //   path: '/cars',
    //   name: 'cars',
    //   component: Cars,
    //   meta: {
    //     auth: true
    //   }
    // }
  ]
})

export default router
