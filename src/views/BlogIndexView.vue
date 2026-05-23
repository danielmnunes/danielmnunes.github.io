<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { usePosts } from '@/composables/usePosts'

const { posts } = usePosts()

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

const items = computed(() =>
  posts.map((post) => ({
    ...post,
    formattedDate: dateFormatter.format(new Date(post.date)),
  })),
)
</script>

<template>
  <section class="blog-index">
    <div class="container">
      <header class="page-header">
        <h1>Blog</h1>
        <p class="subtitle">Notas sobre engenharia de software, IA e o que aprendo no caminho.</p>
      </header>

      <p v-if="!items.length" class="empty">Nenhum post publicado ainda.</p>

      <ul v-else class="post-list">
        <li v-for="post in items" :key="post.slug" class="post-card">
          <RouterLink :to="`/blog/${post.slug}`" class="post-link">
            <h2>{{ post.title }}</h2>
            <time :datetime="post.date">{{ post.formattedDate }}</time>
            <p v-if="post.description" class="description">{{ post.description }}</p>
            <ul v-if="post.tags.length" class="tags" aria-label="Tags">
              <li v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</li>
            </ul>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.blog-index {
  padding: 3rem 0 4rem;
}

.page-header {
  margin-bottom: 2.5rem;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--alt-fg);
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
}

.subtitle {
  opacity: 0.7;
  font-size: 1rem;
}

.empty {
  opacity: 0.6;
}

.post-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.post-card {
  border: 1px solid var(--alt-bg);
  border-radius: 8px;
  transition:
    border-color var(--transition),
    background-color var(--transition);
}

.post-card:hover {
  border-color: var(--link);
  background-color: var(--alt-bg);
}

.post-link {
  display: block;
  padding: 1.25rem 1.5rem;
  color: inherit;
  text-decoration: none;
}

.post-link:hover {
  text-decoration: none;
}

.post-card h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--alt-fg);
  margin-bottom: 0.35rem;
  letter-spacing: -0.3px;
}

.post-card time {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  opacity: 0.6;
  margin-bottom: 0.6rem;
}

.description {
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 0.75rem;
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
  color: var(--fg);
  opacity: 0.85;
}

.post-card:hover .tag {
  background-color: var(--darker-alt-bg);
}
</style>
