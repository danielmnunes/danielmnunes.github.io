import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogIndexView from '@/views/BlogIndexView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/blog', name: 'blog', component: BlogIndexView },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostView, props: true },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
