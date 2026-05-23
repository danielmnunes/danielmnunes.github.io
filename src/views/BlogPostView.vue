<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { usePosts } from '@/composables/usePosts'
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps<{ slug: string }>()

const { getPost } = usePosts()

const post = ref(getPost(props.slug))
const html = ref('')
const loading = ref(false)

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

watchEffect(async () => {
  post.value = getPost(props.slug)
  html.value = ''

  if (!post.value) return

  loading.value = true
  try {
    html.value = await renderMarkdown(post.value.body)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="blog-post">
    <div class="container">
      <p class="back-link">
        <RouterLink to="/blog">← Voltar para o blog</RouterLink>
      </p>

      <template v-if="post">
        <header class="post-header">
          <h1>{{ post.title }}</h1>
          <time :datetime="post.date">{{ dateFormatter.format(new Date(post.date)) }}</time>
          <ul v-if="post.tags.length" class="tags" aria-label="Tags">
            <li v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</li>
          </ul>
        </header>

        <p v-if="loading" class="loading">Carregando…</p>
        <article v-else class="post-content" lang="pt-BR" v-html="html"></article>
      </template>

      <div v-else class="not-found">
        <h1>Post não encontrado</h1>
        <p>O post que você procura não existe ou foi removido.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-post {
  padding: 2.5rem 0 4rem;
}

.back-link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.post-header {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--alt-bg);
  padding-bottom: 1.5rem;
}

.post-header h1 {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  color: var(--alt-fg);
  letter-spacing: -1px;
  margin-bottom: 0.6rem;
  line-height: 1.15;
}

.post-header time {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  opacity: 0.6;
  margin-bottom: 0.8rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background-color: var(--alt-bg);
  opacity: 0.85;
}

.loading {
  opacity: 0.6;
  font-family: var(--font-mono);
}

.not-found h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--alt-fg);
}

.not-found p {
  opacity: 0.7;
}

.post-content :deep(h2) {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--alt-fg);
  margin: 2.25rem 0 0.85rem;
  letter-spacing: -0.5px;
}

.post-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--alt-fg);
  margin: 1.75rem 0 0.75rem;
}

.post-content :deep(p) {
  margin: 0 0 1.1rem;
  line-height: 1.75;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 0 0 1.1rem 1.5rem;
  line-height: 1.75;
}

.post-content :deep(li) {
  margin-bottom: 0.35rem;
}

.post-content :deep(blockquote) {
  border-left: 3px solid var(--link);
  padding: 0.3rem 0 0.3rem 1rem;
  margin: 1.25rem 0;
  opacity: 0.85;
  font-style: italic;
}

.post-content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.15em 0.4em;
  background-color: var(--alt-bg);
  border-radius: 3px;
}

.post-content :deep(pre) {
  margin: 1.25rem 0;
  padding: 1rem 1.1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.88rem;
  line-height: 1.55;
  border: 1px solid var(--alt-bg);
}

.post-content :deep(pre code) {
  padding: 0;
  background: none;
  border-radius: 0;
  font-size: inherit;
}

.post-content :deep(pre.shiki-fallback) {
  background-color: var(--alt-bg);
}

.post-content :deep(.shiki) {
  background-color: var(--alt-bg) !important;
}

html.dark .post-content :deep(.shiki),
html.dark .post-content :deep(.shiki span) {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.post-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--alt-bg);
  margin: 2rem 0;
}

.post-content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
}
</style>
