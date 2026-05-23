<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import AppFooter from '@/components/AppFooter.vue'

import '@/composables/useTheme'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
  </main>
  <AppFooter />
</template>

<style>
/* ── Design tokens (Hugo Coder palette from sd.md) ── */
:root {
  --bg: #fafafa;
  --fg: #212121;
  --alt-bg: #e0e0e0;
  --darker-alt-bg: #cccccc;
  --alt-fg: #000000;
  --link: #1565c0;
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, sans-serif;
  --font-mono: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  --transition: 200ms ease;
  --header-h: 54px;
  --footer-h: 49px;
}

html.dark {
  --bg: #212121;
  --fg: #dadada;
  --alt-bg: #424242;
  --darker-alt-bg: #4f4f4f;
  --alt-fg: #dadada;
  --link: #42a5f5;
}

/* ── Reset ── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-ui);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background-color var(--transition), color var(--transition);
}

a {
  color: var(--link);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* ── Layout helpers ── */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.75rem;
}


</style>
