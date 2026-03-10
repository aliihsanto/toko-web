import { describe, it, expect, vi } from 'vitest';

vi.mock('#site/content', () => ({
  posts: [
    {
      slug: 'blog/tr/post-1',
      title: 'TR Post 1',
      description: 'Turkish post about imports',
      date: '2026-03-01',
      published: true,
      category: 'import',
      excerpt: 'Turkish import post excerpt',
      body: 'const _runtime = arguments[0]; return { default: () => null }',
      toc: [
        { title: 'Introduction', url: '#introduction', items: [] },
        {
          title: 'Details',
          url: '#details',
          items: [{ title: 'Sub detail', url: '#sub-detail' }],
        },
      ],
      metadata: { readingTime: 5, wordCount: 500 },
    },
    {
      slug: 'blog/tr/draft-post',
      title: 'Draft Post',
      description: 'Unpublished draft',
      date: '2026-03-10',
      published: false,
      category: 'import',
      excerpt: 'Draft excerpt',
      body: '',
      toc: [],
      metadata: { readingTime: 2, wordCount: 200 },
    },
    {
      slug: 'blog/en/en-post',
      title: 'EN Post',
      description: 'English post',
      date: '2026-03-02',
      published: true,
      category: 'export',
      excerpt: 'English export',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
  ],
}));

import { getPostBySlug } from '@/lib/blog/utils';

describe('Blog Detail', () => {
  it('returns correct post for valid locale and slug', () => {
    const post = getPostBySlug('tr', 'post-1');
    expect(post).toBeDefined();
    expect(post!.title).toBe('TR Post 1');
    expect(post!.slug).toBe('blog/tr/post-1');
  });

  it('returns undefined for invalid slug', () => {
    const post = getPostBySlug('tr', 'nonexistent');
    expect(post).toBeUndefined();
  });

  it('returns undefined for unpublished post', () => {
    const post = getPostBySlug('tr', 'draft-post');
    expect(post).toBeUndefined();
  });

  it('post has toc array and metadata.readingTime', () => {
    const post = getPostBySlug('tr', 'post-1');
    expect(post).toBeDefined();
    expect(Array.isArray(post!.toc)).toBe(true);
    expect(post!.toc.length).toBeGreaterThan(0);
    expect(post!.metadata.readingTime).toBe(5);
  });

  it('does not return posts from wrong locale', () => {
    const post = getPostBySlug('tr', 'en-post');
    expect(post).toBeUndefined();
  });
});
