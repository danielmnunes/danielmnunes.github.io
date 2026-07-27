# Guia da base de código — site-pessoal

Portfolio pessoal de **Daniel Nunes** (SPA estática), publicado em [danielmnunes.github.io](https://danielmnunes.github.io).

Este documento descreve pontos de entrada, módulos-chave e o que ler antes de alterar o projeto. O `README.md` na raiz está **parcialmente desatualizado** (não cobre blog, i18n nem router).

---

## O que é este projeto

Site estático (portfolio + blog) em **Vue 3 + Vite 8 + TypeScript**, com:

- Rotas client-side (`vue-router`)
- UI bilíngue PT/EN (`vue-i18n`)
- Posts em Markdown versionados em `src/content/blog/`
- Tema claro/escuro persistido em `localStorage`
- Deploy automático no **GitHub Pages** via Actions

Package manager: **Bun**. Lint: oxlint + ESLint. Format: oxfmt.

---

## Pontos de entrada

| Camada | Arquivo | Papel |
|---|---|---|
| HTML shell | `index.html` | Monta `#app`, meta/OG, favicon SVG inline, analytics Cloudflare |
| Bootstrap JS | `src/main.ts` | `createApp` → `router` + `i18n` → mount |
| Shell da UI | `src/App.vue` | Header + `<RouterView>` + Footer; **tokens CSS globais**; side-effect de tema/idioma |
| Build | `vite.config.ts` | Alias `@` → `src`; plugin que copia `index.html` → `dist/404.html` (SPA no Pages) |
| CI/CD | `.github/workflows/deploy.yml` | Push em `main` → `bun install --frozen-lockfile` → build → GitHub Pages |

Fluxo de boot:

```
index.html
  └─ src/main.ts
       ├─ src/router/index.ts
       ├─ src/i18n/index.ts
       └─ src/App.vue
            ├─ AppHeader / AppFooter
            ├─ useTheme + useLanguage (side-effect)
            └─ <RouterView> → views/*
```

---

## Rotas

Definidas em `src/router/index.ts`:

| Path | Nome | View |
|---|---|---|
| `/` | `home` | `HomeView` → `HeroSection` |
| `/blog` | `blog` | `BlogIndexView` |
| `/blog/:slug` | `blog-post` | `BlogPostView` (`props: true`) |
| `/*` | `not-found` | `NotFoundView` |

`scrollBehavior` sempre volta ao topo. Não há hoje `document.title` dinâmico por rota (chaves `titles.*` existem no i18n, mas não são usadas).

O plugin `spa404Fallback` em `vite.config.ts` é essencial para deep links no GitHub Pages: o Pages serve `404.html` em rotas inexistentes no servidor; copiar o `index.html` permite que a SPA assuma o roteamento.

---

## Estrutura de pastas (src)

```
src/
├── main.ts                 # bootstrap
├── App.vue                 # layout + design tokens
├── router/index.ts         # rotas
├── i18n/
│   ├── index.ts            # createI18n, detectLocale, formatDate
│   ├── messages/pt.ts      # schema canônico (MessageSchema)
│   ├── messages/en.ts      # deve espelhar pt.ts
│   └── vue-i18n.d.ts       # tipagem das chaves t('...')
├── composables/
│   ├── useTheme.ts         # dark/light (singleton)
│   ├── useLanguage.ts      # pt/en + <html lang>
│   └── usePosts.ts         # carrega .md via import.meta.glob
├── utils/
│   ├── frontmatter.ts      # parser YAML simples (title/date/description/tags)
│   └── markdown.ts         # markdown-it + Shiki
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── HeroSection.vue
├── views/
│   ├── HomeView.vue
│   ├── BlogIndexView.vue
│   ├── BlogPostView.vue
│   └── NotFoundView.vue
└── content/blog/*.md       # posts (fonte de verdade do blog)
```

Assets estáticos: `public/` (hoje `favicon.svg`; o hero referencia `/cv.pdf`, que **não está no repositório** neste momento).

---

## Módulos-chave

### 1. Design system — `App.vue`

Tokens CSS (`--bg`, `--fg`, `--link`, etc.) inspirados no tema Hugo Coder. Tema escuro via `html.dark`. Qualquer mudança visual global começa aqui. Layout helpers: `.container` (max-width 900px).

### 2. Tema — `useTheme.ts`

Singleton: lê `localStorage.theme` ou `prefers-color-scheme`, aplica classe `dark` no `<html>`, persiste no toggle. Importado como side-effect em `App.vue` para aplicar cedo.

### 3. Idioma — `i18n/` + `useLanguage.ts`

- Locales: `pt` | `en` (`DEFAULT_LOCALE = 'pt'`)
- Detecção: `localStorage.lang` → senão idioma do browser
- Schema tipado: edite **primeiro** `messages/pt.ts`, depois alinhe `en.ts`
- `formatDate(iso)` usa `timeZone: 'UTC'` de propósito (evita “dia anterior” em fusos negativos)

UI (header, hero, footer, 404, índice do blog) usa `t(...)`. A view de post ainda tem strings hardcoded em PT — ver “Armadilhas” abaixo.

### 4. Blog — `usePosts` + content + markdown

Pipeline:

1. `import.meta.glob('@/content/blog/*.md', { query: '?raw', eager: true })` embute os arquivos no bundle
2. `parseFrontmatter` extrai metadados
3. Posts sem `title` ou `date` são ignorados
4. Ordenação: data decrescente
5. `BlogPostView` chama `renderMarkdown` (markdown-it + Shiki async)

**Frontmatter esperado:**

```yaml
---
title: Título
date: 2026-05-23
description: Resumo curto
tags: [tag1, tag2]
---
```

O parser é **deliberadamente simples** (não é YAML completo): só `title`, `date`, `description` e `tags` em array inline `[a, b]`.

**Slug** = nome do arquivo sem `.md` (ex.: `hello-world.md` → `/blog/hello-world`).

Linguagens Shiki suportadas: `ts`, `js`, `vue`, `bash`, `json`, `md`, `java`, `go`, `proto`, `yaml`. Outras caem em fallback escapado.

### 5. Componentes de UI

| Componente | Responsabilidade |
|---|---|
| `AppHeader` | Brand `{dn.}`, link blog, toggle idioma, toggle tema |
| `HeroSection` | Nome, role/bio i18n, GitHub/LinkedIn, download CV |
| `AppFooter` | Copyright + “Feito com Vue/Vite” |

---

## Deploy

Workflow `.github/workflows/deploy.yml`:

1. Checkout + Bun + cache do store Bun
2. `bun install --frozen-lockfile`
3. `bun run build` (= type-check + `vite build` em paralelo)
4. Upload de `dist/` → GitHub Pages

`base: '/'` no Vite — adequado a user/org site (`username.github.io`), não a project pages sob subpath.

---

## O que ler antes de alterar

Ordem sugerida:

1. **`src/main.ts` + `src/App.vue`** — boot e tokens
2. **`src/router/index.ts`** — mapa de páginas
3. **`src/i18n/messages/pt.ts`** — textos da UI (e schema)
4. **`src/composables/usePosts.ts` + `src/utils/frontmatter.ts`** — contrato dos posts
5. **`src/utils/markdown.ts`** — se for mexer em highlighting ou HTML gerado
6. **`.github/workflows/deploy.yml` + `vite.config.ts`** — se tocar em build/deploy ou base path

### Tarefas comuns → onde mexer

| Quero… | Arquivos |
|---|---|
| Novo post | Criar `src/content/blog/<slug>.md` com frontmatter |
| Texto da home / header / footer | `i18n/messages/pt.ts` + `en.ts` |
| Nova página | View em `views/` + rota em `router/index.ts` + chaves i18n |
| Cores / tipografia | `:root` / `html.dark` em `App.vue` |
| Nova linguagem no highlighter | `SUPPORTED_LANGS` + import em `markdown.ts` |
| Links sociais / CV | `HeroSection.vue` (+ colocar o PDF em `public/`) |

---

## Armadilhas e débito técnico atuais

Estado observado no código — útil antes de “consertar” ou estender:

1. **`BlogIndexView` usa `posts.value`**, mas `usePosts()` devolve um **array plano** (`PostMeta[]`), não um `ref`. Isso quebra a listagem em runtime/tipos.
2. **`BlogPostView` chama `getAdjacentPosts`**, que **não existe** em `usePosts`. Há `adjacent` computado e não usado no template.
3. **i18n incompleto no post**: strings hardcoded em PT; chaves `blog.back`, `blog.loading`, etc. já existem nas messages.
4. **Posts bilíngues incompletos**: existe `hello-world.en.md`, mas o slug atual seria literalmente `hello-world.en` — não há resolução `slug` + locale (as keys `blog.fallbackNotice` sugerem que isso foi planejado).
5. **`titles.*` no i18n** não atualizam `document.title`.
6. **`/cv.pdf`** referenciado no hero, mas o arquivo não está em `public/`.
7. **`README.md`** descreve só portfolio sem blog/i18n; menciona `sd.md`, que não existe no repo.
8. Markdown renderiza com `html: false` (seguro contra HTML cru nos posts) — não reative HTML sem avaliar XSS.

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
- Manter o visual alinhado aos tokens existentes (não introduzir outro “design system”).
- Posts = arquivos Markdown no repo; sem CMS/DB.
- Mudanças de copy de UI sempre nos **dois** locales.
- Após mexer em tipos/rotas/composables do blog, rode `bun run build` — o CI falha em type-check.
- Não remova o fallback `404.html` sem alternativa para deep links no Pages.
`
