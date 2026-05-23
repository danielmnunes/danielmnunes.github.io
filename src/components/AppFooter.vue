<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="container footer-inner">
      <p><span class="name">Daniel Nunes</span> &copy; {{ year }}</p>
      <p class="built-with">
        Built with
        <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a>
        &amp;
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--alt-bg);
  padding: 0.85rem 0;
  transition: border-color var(--transition);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  opacity: 0.6;
}

.name {
  font-weight: 600;
}

@media (max-width: 480px) {
  .footer-inner {
    flex-direction: column;
    gap: 0.4rem;
    text-align: center;
  }
}
</style>
