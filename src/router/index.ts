import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [   
    {
      path: '/',
      name: 'Main',
      component: MainView
    },    
    {
      path: '/Favorites',
      name: 'Favorites',
      component: () => import('@/views/FavoritesView.vue')
    }
  ]
})

export default router
