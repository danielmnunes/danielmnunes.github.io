import MarkdownIt from 'markdown-it'
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const SUPPORTED_LANGS = ['ts', 'js', 'vue', 'bash', 'json', 'md'] as const

let highlighterPromise: Promise<HighlighterCore> | null = null

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
      langs: [
        import('shiki/langs/ts.mjs'),
        import('shiki/langs/js.mjs'),
        import('shiki/langs/vue.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/md.mjs'),
      ],
      engine: createOnigurumaEngine(() => import('shiki/wasm')),
    })
  }
  return highlighterPromise
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function createRenderer(highlighter: HighlighterCore): MarkdownIt {
  return new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    highlight(code, lang) {
      const normalized = (lang || '').toLowerCase()
      const safeLang = (SUPPORTED_LANGS as readonly string[]).includes(normalized)
        ? normalized
        : null

      if (!safeLang) {
        return `<pre class="shiki-fallback"><code>${escapeHtml(code)}</code></pre>`
      }

      return highlighter.codeToHtml(code, {
        lang: safeLang,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
    },
  })
}

export async function renderMarkdown(body: string): Promise<string> {
  const highlighter = await getHighlighter()
  const md = createRenderer(highlighter)
  return md.render(body)
}
