import { describe, it, expect, vi } from 'vitest';

// Mock #site/content with fixture data
vi.mock('#site/content', () => ({
  posts: [
    {
      slug: 'blog/tr/post-1',
      title: 'TR Post 1',
      description: 'TR Post 1 description',
      date: '2026-03-01',
      published: true,
      category: 'import',
      excerpt: 'Turkish import post excerpt',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
    {
      slug: 'blog/tr/post-2',
      title: 'TR Post 2',
      description: 'TR Post 2 description',
      date: '2026-03-05',
      published: true,
      category: 'export',
      excerpt: 'Turkish export post excerpt',
      body: '',
      toc: [],
      metadata: { readingTime: 5, wordCount: 500 },
    },
    {
      slug: 'blog/tr/post-3',
      title: 'TR Post 3',
      description: 'TR Post 3 description',
      date: '2026-03-03',
      published: true,
      category: 'import',
      excerpt: 'Turkish import post 3',
      body: '',
      toc: [],
      metadata: { readingTime: 4, wordCount: 400 },
    },
    {
      slug: 'blog/tr/post-4',
      title: 'TR Post 4',
      date: '2026-02-28',
      description: 'desc',
      published: true,
      category: 'customs',
      excerpt: 'TR customs',
      body: '',
      toc: [],
      metadata: { readingTime: 2, wordCount: 200 },
    },
    {
      slug: 'blog/tr/post-5',
      title: 'TR Post 5',
      date: '2026-02-25',
      description: 'desc',
      published: true,
      category: 'logistics',
      excerpt: 'TR logistics',
      body: '',
      toc: [],
      metadata: { readingTime: 6, wordCount: 600 },
    },
    {
      slug: 'blog/tr/post-6',
      title: 'TR Post 6',
      date: '2026-02-20',
      description: 'desc',
      published: true,
      category: 'import',
      excerpt: 'TR import 6',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
    {
      slug: 'blog/tr/post-7',
      title: 'TR Post 7',
      date: '2026-02-15',
      description: 'desc',
      published: true,
      category: 'export',
      excerpt: 'TR export 7',
      body: '',
      toc: [],
      metadata: { readingTime: 4, wordCount: 400 },
    },
    {
      slug: 'blog/tr/post-8',
      title: 'TR Post 8',
      date: '2026-02-10',
      description: 'desc',
      published: true,
      category: 'customs',
      excerpt: 'TR customs 8',
      body: '',
      toc: [],
      metadata: { readingTime: 5, wordCount: 500 },
    },
    {
      slug: 'blog/tr/post-9',
      title: 'TR Post 9',
      date: '2026-02-05',
      description: 'desc',
      published: true,
      category: 'import',
      excerpt: 'TR import 9',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
    {
      slug: 'blog/tr/post-10',
      title: 'TR Post 10',
      date: '2026-02-01',
      description: 'desc',
      published: true,
      category: 'export',
      excerpt: 'TR export 10',
      body: '',
      toc: [],
      metadata: { readingTime: 7, wordCount: 700 },
    },
    {
      slug: 'blog/en/post-1',
      title: 'EN Post 1',
      description: 'EN desc',
      date: '2026-03-03',
      published: true,
      category: 'import',
      excerpt: 'English import',
      body: '',
      toc: [],
      metadata: { readingTime: 4, wordCount: 400 },
    },
  ],
}));

import {
  getPaginatedPosts,
  getPostsByLocale,
  POSTS_PER_PAGE,
} from '@/lib/blog/utils';

describe('Blog Listing', () => {
  describe('getPaginatedPosts', () => {
    it('returns first page with correct number of posts', () => {
      const result = getPaginatedPosts('tr', 1);
      expect(result.posts).toHaveLength(POSTS_PER_PAGE);
      expect(result.currentPage).toBe(1);
    });

    it('page 1 has correct number (min of POSTS_PER_PAGE or total)', () => {
      const enResult = getPaginatedPosts('en', 1);
      // Only 1 EN post, so page 1 should have 1
      expect(enResult.posts.length).toBeLessThanOrEqual(POSTS_PER_PAGE);
      expect(enResult.posts).toHaveLength(1);
    });

    it('totalPages calculation is correct', () => {
      const result = getPaginatedPosts('tr', 1);
      const allPosts = getPostsByLocale('tr');
      const expectedTotal = Math.ceil(allPosts.length / POSTS_PER_PAGE);
      expect(result.totalPages).toBe(expectedTotal);
    });

    it('empty locale returns empty posts array', () => {
      const result = getPaginatedPosts('xx', 1);
      expect(result.posts).toHaveLength(0);
      expect(result.totalPages).toBe(0);
    });
  });
});
