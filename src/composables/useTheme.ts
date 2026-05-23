import { ref, watch } from 'vue'

const stored = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(stored ? stored === 'dark' : prefersDark)

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

apply(isDark.value)

watch(isDark, (val) => {
  apply(val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
})

export function useTheme() {
  return {
    isDark,
    toggle: () => {
      isDark.value = !isDark.value
    },
  }
}
