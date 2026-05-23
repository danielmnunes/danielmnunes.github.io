<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <header>
    <div class="container header-inner">
      <RouterLink to="/" class="brand">{dn.}</RouterLink>
      <nav class="nav">
        <RouterLink to="/blog" class="nav-link">blog</RouterLink>
      </nav>
      <button
        class="theme-toggle"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm8-8a1 1 0 0 1 0 2h-1a1 1 0 1 1 0-2h1zM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm12.657-6.343a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.05 17.364a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm9.9 0a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM5.636 5.636a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 6.343 7.757l-.707-.707a1 1 0 0 1 0-1.414zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg);
  border-bottom: 1px solid var(--alt-bg);
  transition:
    background-color var(--transition),
    border-color var(--transition);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.brand {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--link);
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav {
  margin-right: auto;
  margin-left: 1.5rem;
  display: flex;
  gap: 1.25rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--fg);
  opacity: 0.7;
  text-decoration: none;
  transition:
    opacity var(--transition),
    color var(--transition);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--link);
  opacity: 1;
  text-decoration: none;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--alt-bg);
  border-radius: 6px;
  cursor: pointer;
  color: var(--fg);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color var(--transition),
    color var(--transition),
    background-color var(--transition);
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--link);
  color: var(--link);
}
</style>
