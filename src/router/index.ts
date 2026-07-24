import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const DEFAULT_TITLE = 'Daniel Nunes — Software Engineer · AI-Native'
const SITE_NAME = 'Daniel Nunes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: DEFAULT_TITLE } },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogIndexView.vue'),
      meta: { title: `Blog — ${SITE_NAME}` },
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('@/views/BlogPostView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: `Página não encontrada — ${SITE_NAME}` },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})
