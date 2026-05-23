# danielmnunes.github.io

Personal portfolio of **Daniel Nunes** — Backend Software Engineer · AI-Native.

Live at **[danielmnunes.github.io](https://danielmnunes.github.io)**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) — Composition API, `<script setup lang="ts">` |
| Build | [Vite 8](https://vite.dev/) |
| Language | TypeScript |
| Package manager | [Bun](https://bun.sh/) |
| Lint | [oxlint](https://oxc.rs/docs/guide/usage/linter) + [ESLint](https://eslint.org/) |
| Format | [oxfmt](https://github.com/nicolo-ribaudo/oxfmt) |

## Design System

Colors, typography and icon references follow the **[Hugo Coder](https://github.com/luizdepra/hugo-coder)** theme (`sd.md`).

CSS custom properties defined in `src/App.vue`:

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
├── composables/
│   └── useTheme.ts          # dark/light toggle — singleton, persists to localStorage
├── components/
│   ├── AppHeader.vue        # sticky header with {dn.} brand + theme toggle
│   ├── HeroSection.vue      # name, role, bio, social links, CV download
│   └── AppFooter.vue        # copyright + built-with
└── App.vue                  # global CSS tokens + layout composition
```

## Getting Started

```sh
bun install
```

```sh
bun dev          # dev server at http://localhost:5173
bun run build    # type-check + production build
bun lint         # oxlint + eslint
```

## Features

- Dark / light mode with `prefers-color-scheme` detection and `localStorage` persistence
- Inline SVG icons — no external icon library
- SVG favicon (`{dn.}`) embedded as data URI — no cache issues
- System font stack — zero web font requests

## License

MIT
