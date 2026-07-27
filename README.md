# danielmnunes.github.io

Personal portfolio of **Daniel Nunes** — Backend Software Engineer · AI-Native.

Live at **[danielmnunes.github.io](https://danielmnunes.github.io)**

For a deeper map of entry points and modules, see [`CODEBASE.md`](./CODEBASE.md).

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) — Composition API, `<script setup lang="ts">` |
| Routing | [Vue Router](https://router.vuejs.org/) |
| Build | [Vite 8](https://vite.dev/) |
| Language | TypeScript |
| Package manager | [Bun](https://bun.sh/) |
| Blog | Markdown + [markdown-it](https://github.com/markdown-it/markdown-it) + [Shiki](https://shiki.style/) |
| Lint | [oxlint](https://oxc.rs/docs/guide/usage/linter) + [ESLint](https://eslint.org/) |
| Format | [oxfmt](https://github.com/nicolo-ribaudo/oxfmt) |
| Deploy | GitHub Pages (`.github/workflows/deploy.yml`) |

## Design System

Colors and typography follow the **[Hugo Coder](https://luizdepra.github.io/hugo-coder/)** palette.

CSS custom properties are defined in `src/App.vue`:

```css
:root {
  --bg: #fafafa;       /* light background */
  --fg: #212121;       /* light foreground */
  --link: #1565c0;     /* accent / links   */
  --header-h: 54px;    /* used in hero calc */
  --footer-h: 49px;
}
html.dark {
  --bg: #212121;
  --fg: #dadada;
  --link: #42a5f5;
}
```

## Project Structure

```
src/
├── main.ts                 # app bootstrap
├── App.vue                 # layout shell + CSS design tokens
├── router/index.ts         # routes + document.title
├── composables/
│   ├── useTheme.ts         # dark/light toggle (localStorage)
│   └── usePosts.ts         # loads Markdown posts at build time
├── utils/
│   ├── frontmatter.ts      # simple YAML frontmatter parser
│   └── markdown.ts         # markdown-it + Shiki highlighting
├── components/
│   ├── AppHeader.vue
│   ├── HeroSection.vue
│   └── AppFooter.vue
├── views/
│   ├── HomeView.vue
│   ├── BlogIndexView.vue
│   ├── BlogPostView.vue
│   └── NotFoundView.vue
└── content/blog/*.md       # blog posts (source of truth)
public/
├── favicon.svg
└── cv.pdf
```

## Getting Started

```sh
bun install
```

```sh
bun dev          # http://localhost:5173
bun run build    # type-check + production build
bun lint         # oxlint + eslint
```

## Blog posts

Create a file in `src/content/blog/<slug>.md`:

```yaml
---
title: Post title
date: 2026-05-23
description: Short summary
tags: [tag1, tag2]
---

Markdown body…
```

- Slug = filename without `.md` → `/blog/<slug>`
- Files named `slug.<locale>.md` (e.g. `hello-world.en.md`) are **ignored** until content i18n exists
- Dates are formatted with `timeZone: 'UTC'` so calendar dates do not shift in negative offsets

## Features

- Dark / light mode with `prefers-color-scheme` detection and `localStorage` persistence
- Static Markdown blog with syntax highlighting
- SPA deep-link support on GitHub Pages via `dist/404.html` copy in Vite build
- Inline SVG icons — no external icon library
- SVG favicon (`{dn.}`) embedded as data URI
- System font stack — zero web font requests

## License

MIT
