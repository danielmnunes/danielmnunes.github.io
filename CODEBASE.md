# Guia da base de código — site-pessoal

Portfolio pessoal de **Daniel Nunes** (SPA estática), publicado em [danielmnunes.github.io](https://danielmnunes.github.io).

Este documento descreve pontos de entrada, módulos-chave e o que ler antes de alterar o projeto. O `README.md` cobre stack, estrutura e como publicar posts; aqui está o mapa para mudanças de código.

---

## O que é este projeto

Site estático (portfolio + blog) em **Vue 3 + Vite 8 + TypeScript**, com:

- Rotas client-side (`vue-router`)
- Posts em Markdown versionados em `src/content/blog/`
- Tema claro/escuro persistido em `localStorage`
- Deploy automático no **GitHub Pages** via Actions

Package manager: **Bun**. Lint: oxlint + ESLint. Format: oxfmt.

Não há `vue-i18n` neste estado do repo — a UI do blog/home está em português.

---

## Pontos de entrada

| Camada | Arquivo | Papel |
|---|---|---|
| HTML shell | `index.html` | Monta `#app`, meta/OG, favicon SVG inline, analytics Cloudflare |
| Bootstrap JS | `src/main.ts` | `createApp` → `router` → mount |
| Shell da UI | `src/App.vue` | Header + `<RouterView>` + Footer; **tokens CSS globais**; side-effect de tema |
| Build | `vite.config.ts` | Alias `@` → `src`; plugin que copia `index.html` → `dist/404.html` (SPA no Pages) |
| CI/CD | `.github/workflows/deploy.yml` | Push em `main` → `bun install --frozen-lockfile` → build → GitHub Pages |

Fluxo de boot:

```
index.html
  └─ src/main.ts
       ├─ src/router/index.ts
       └─ src/App.vue
            ├─ AppHeader / AppFooter
            ├─ useTheme (side-effect)
            └─ <RouterView> → views/*
```

---

## Rotas

Definidas em `src/router/index.ts`:

| Path | Nome | View |
|---|---|---|
| `/` | `home` | `HomeView` → `HeroSection` |
| `/blog` | `blog` | `BlogIndexView` (lazy) |
| `/blog/:slug` | `blog-post` | `BlogPostView` (lazy, `props: true`) |
| `/*` | `not-found` | `NotFoundView` (lazy) |

`scrollBehavior` volta ao topo. `router.afterEach` aplica `document.title` a partir de `meta.title` (home, blog, 404). A view do post define o título no próprio componente.

O plugin `spa404Fallback` em `vite.config.ts` é essencial para deep links no GitHub Pages: o Pages serve `404.html` em rotas inexistentes no servidor; copiar o `index.html` permite que a SPA assuma o roteamento.

---

## Estrutura de pastas (src)

```
src/
├── main.ts
├── App.vue
├── router/index.ts
├── composables/
│   ├── useTheme.ts
│   └── usePosts.ts
├── utils/
│   ├── frontmatter.ts
│   └── markdown.ts
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── HeroSection.vue
├── views/
│   ├── HomeView.vue
│   ├── BlogIndexView.vue
│   ├── BlogPostView.vue
│   └── NotFoundView.vue
└── content/blog/*.md
```

Assets estáticos: `public/favicon.svg`, `public/cv.pdf`.

---

## Módulos-chave

### 1. Design system — `App.vue`

Tokens CSS (`--bg`, `--fg`, `--link`, etc.) inspirados no tema Hugo Coder. Tema escuro via `html.dark`. Layout helper: `.container` (max-width 900px).

### 2. Tema — `useTheme.ts`

Singleton: lê `localStorage.theme` ou `prefers-color-scheme`, aplica classe `dark` no `<html>`, persiste no toggle. Importado como side-effect em `App.vue`.

### 3. Blog — `usePosts` + content + markdown

Pipeline:

1. `import.meta.glob('@/content/blog/*.md', { query: '?raw', eager: true })` embute os arquivos no bundle
2. Slugs com sufixo de locale (`.\.(pt|en)$`, ex.: `hello-world.en`) são **ignorados**
3. `parseFrontmatter` extrai metadados
4. Posts sem `title` ou `date` são ignorados
5. Ordenação: data decrescente
6. `getAdjacentPosts` alimenta a navegação prev/next na view do post
7. `BlogPostView` chama `renderMarkdown` (markdown-it + Shiki async)

**Frontmatter esperado:**

```yaml
---
title: Título
date: 2026-05-23
description: Resumo curto
tags: [tag1, tag2]
---
```

O parser é deliberadamente simples (não é YAML completo): só `title`, `date`, `description` e `tags` em array inline `[a, b]`.

**Datas na UI:** `BlogIndexView` e `BlogPostView` usam `Intl.DateTimeFormat` com `timeZone: 'UTC'` para não exibir o dia anterior em fusos negativos.

Linguagens Shiki suportadas: `ts`, `js`, `vue`, `bash`, `json`, `md`, `java`, `go`, `proto`, `yaml`. Outras caem em fallback escapado (`html: false` no markdown-it — sem HTML cru nos posts).

### 4. Componentes de UI

| Componente | Responsabilidade |
|---|---|
| `AppHeader` | Brand `{dn.}`, link blog, toggle tema |
| `HeroSection` | Nome, role/bio, GitHub/LinkedIn, download CV |
| `AppFooter` | Copyright + “Feito com Vue/Vite” |

---

## Deploy

Workflow `.github/workflows/deploy.yml`:

1. Checkout + Bun + cache do store Bun
2. `bun install --frozen-lockfile`
3. `bun run build` (= type-check + `vite build` em paralelo)
4. Upload de `dist/` → GitHub Pages

`base: '/'` no Vite — adequado a user/org site (`username.github.io`).

---

## O que ler antes de alterar

1. **`src/main.ts` + `src/App.vue`** — boot e tokens
2. **`src/router/index.ts`** — mapa de páginas e títulos
3. **`src/composables/usePosts.ts` + `src/utils/frontmatter.ts`** — contrato dos posts
4. **`src/utils/markdown.ts`** — highlighting / HTML gerado
5. **`.github/workflows/deploy.yml` + `vite.config.ts`** — build/deploy ou base path

### Tarefas comuns → onde mexer

| Quero… | Arquivos |
|---|---|
| Novo post | `src/content/blog/<slug>.md` com frontmatter |
| Texto da home | `HeroSection.vue` / `AppFooter.vue` |
| Nova página | View em `views/` + rota em `router/index.ts` |
| Cores / tipografia | `:root` / `html.dark` em `App.vue` |
| Nova linguagem no highlighter | `SUPPORTED_LANGS` + import em `markdown.ts` |
| Links sociais / CV | `HeroSection.vue` (+ PDF em `public/`) |

---

## Armadilhas / débito conhecido

1. **Variantes `slug.en.md`** existem no repo mas são ignoradas por `usePosts` até haver i18n de conteúdo.
2. **UI só em PT** — strings de blog/404/hero estão hardcoded; não há `vue-i18n` neste commit.
3. **Títulos de rota** em `meta.title` estão em PT/EN misturados (home EN, 404 PT); post define título na view.
4. Markdown com `html: false` — não reative HTML cru sem avaliar XSS.
5. Não remova o fallback `404.html` sem alternativa para deep links no Pages.

---

## Comandos

```sh
bun install
bun dev              # http://localhost:5173
bun run build        # type-check + vite build
bun lint             # oxlint + eslint
bun run format       # oxfmt em src/
```

Node engines: `^20.19.0 || >=22.12.0`.

---

## Princípios ao contribuir

- Preferir Composition API + `<script setup lang="ts">`.
- Manter o visual alinhado aos tokens existentes.
- Posts = arquivos Markdown no repo; sem CMS/DB.
- Após mexer em tipos/rotas/composables do blog, rode `bun run build`.
- Não remova o fallback `404.html` sem alternativa para deep links no Pages.
