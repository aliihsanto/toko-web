import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(300),
    date: s.isodate(),
    published: s.boolean().default(true),
    category: s.string(),
    tags: s.array(s.string()).optional(),
    image: s.string().optional(),
    imageAlt: s.string().optional(),
    slug: s.path(),
    body: s.mdx(),
    toc: s.toc(),
    metadata: s.metadata(),
    excerpt: s.excerpt({ length: 200 }),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeShiki, { theme: 'github-light' }],
    ],
  },
});
