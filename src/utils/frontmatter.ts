export interface PostFrontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function stripQuotes(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseInlineArray(value: string): string[] {
  const inner = value.trim().slice(1, -1)
  if (!inner.trim()) return []
  return inner.split(',').map((item) => stripQuotes(item))
}

export function parseFrontmatter(raw: string): { data: PostFrontmatter; body: string } {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) {
    return { data: {}, body: raw }
  }

  const header = match[1] ?? ''
  const body = match[2] ?? ''
  const data: PostFrontmatter = {}

  for (const line of header.split(/\r?\n/)) {
    const fieldMatch = line.match(/^([\w-]+):\s*(.*)$/)
    if (!fieldMatch) continue

    const key = fieldMatch[1]
    const value = (fieldMatch[2] ?? '').trim()
    if (!key) continue

    if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
      data.tags = parseInlineArray(value)
    } else if (key === 'title' || key === 'date' || key === 'description') {
      data[key] = stripQuotes(value)
    }
  }

  return { data, body }
}
