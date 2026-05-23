<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found-view">
    <div class="container">
      <p class="code">404</p>
      <h1>Página não encontrada</h1>
      <p class="message">A página que você procura não existe.</p>
      <p>
        <RouterLink to="/">← Voltar para a home</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.not-found-view {
  min-height: calc(100vh - var(--header-h) - var(--footer-h));
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.code {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--link);
  margin-bottom: 0.5rem;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--alt-fg);
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
}

.message {
  opacity: 0.7;
  margin-bottom: 1.5rem;
}
</style>
