import { parseFrontmatter } from '@/utils/frontmatter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface Post extends PostMeta {
  body: string
}

const rawModules = import.meta.glob('@/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const SLUG_RE = /\/([^/]+)\.md$/

function slugFromPath(path: string): string | null {
  const match = path.match(SLUG_RE)
  return match?.[1] ?? null
}

const allPosts: Post[] = Object.entries(rawModules)
  .map(([path, raw]): Post | null => {
    const slug = slugFromPath(path)
    if (!slug) return null

    const { data, body } = parseFrontmatter(raw)
    if (!data.title || !data.date) return null

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description ?? '',
      tags: data.tags ?? [],
      body,
    }
  })
  .filter((post): post is Post => post !== null)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function usePosts() {
  const posts: PostMeta[] = allPosts.map(({ body: _body, ...meta }) => meta)

  function getPost(slug: string): Post | null {
    return allPosts.find((post) => post.slug === slug) ?? null
  }

  return { posts, getPost }
}
