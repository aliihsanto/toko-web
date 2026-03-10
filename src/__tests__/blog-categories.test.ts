import { describe, it, expect, vi } from 'vitest';

vi.mock('#site/content', () => ({
  posts: [
    {
      slug: 'blog/tr/import-post',
      title: 'Import Post',
      description: 'desc',
      date: '2026-03-01',
      published: true,
      category: 'import',
      excerpt: 'Import post',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
    {
      slug: 'blog/tr/export-post',
      title: 'Export Post',
      description: 'desc',
      date: '2026-03-02',
      published: true,
      category: 'export',
      excerpt: 'Export post',
      body: '',
      toc: [],
      metadata: { readingTime: 4, wordCount: 400 },
    },
    {
      slug: 'blog/tr/customs-post',
      title: 'Customs Post',
      description: 'desc',
      date: '2026-03-03',
      published: true,
      category: 'customs',
      excerpt: 'Customs post',
      body: '',
      toc: [],
      metadata: { readingTime: 5, wordCount: 500 },
    },
    {
      slug: 'blog/tr/import-post-2',
      title: 'Import Post 2',
      description: 'desc',
      date: '2026-03-04',
      published: true,
      category: 'import',
      excerpt: 'Second import post',
      body: '',
      toc: [],
      metadata: { readingTime: 3, wordCount: 300 },
    },
    {
      slug: 'blog/en/en-logistics',
      title: 'EN Logistics',
      description: 'desc',
      date: '2026-03-01',
      published: true,
      category: 'logistics',
      excerpt: 'English logistics',
      body: '',
      toc: [],
      metadata: { readingTime: 4, wordCount: 400 },
    },
  ],
}));

import { getCategories, getPostsByCategory } from '@/lib/blog/utils';

describe('Blog Categories', () => {
  describe('getCategories', () => {
    it('returns unique category list', () => {
      const categories = getCategories('tr');
      expect(categories).toContain('import');
      expect(categories).toContain('export');
      expect(categories).toContain('customs');
      const unique = new Set(categories);
      expect(unique.size).toBe(categories.length);
    });

    it('returns categories only for specified locale', () => {
      const enCategories = getCategories('en');
      expect(enCategories).toEqual(['logistics']);
      expect(enCategories).not.toContain('import');
    });
  });

  describe('getPostsByCategory', () => {
    it('filters correctly by category', () => {
      const importPosts = getPostsByCategory('tr', 'import');
      expect(importPosts).toHaveLength(2);
      importPosts.forEach((post) => {
        expect(post.category).toBe('import');
      });
    });

    it('returns empty array for nonexistent category', () => {
      const posts = getPostsByCategory('tr', 'nonexistent');
      expect(posts).toEqual([]);
    });

    it('filters by both locale and category', () => {
      const posts = getPostsByCategory('en', 'import');
      expect(posts).toEqual([]);
    });
  });
});
