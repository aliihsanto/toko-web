import { describe, it, expect, vi } from 'vitest';

// Mock the #site/content module with test fixture data
vi.mock('#site/content', () => ({
  posts: [
    {
      slug: 'blog/tr/post-1',
      title: 'TR Post 1',
      date: '2026-03-01',
      published: true,
      category: 'import',
      excerpt: 'Turkish import post excerpt',
    },
    {
      slug: 'blog/tr/post-2',
      title: 'TR Post 2',
      date: '2026-03-05',
      published: true,
      category: 'export',
      excerpt: 'Turkish export post excerpt',
    },
    {
      slug: 'blog/tr/post-3',
      title: 'TR Post 3',
      date: '2026-03-03',
      published: true,
      category: 'import',
      excerpt: 'Turkish import post 3',
    },
    {
      slug: 'blog/tr/draft',
      title: 'TR Draft',
      date: '2026-03-10',
      published: false,
      category: 'import',
      excerpt: 'Draft post',
    },
    {
      slug: 'blog/en/post-1',
      title: 'EN Post 1',
      date: '2026-03-03',
      published: true,
      category: 'import',
      excerpt: 'English import post excerpt',
    },
    {
      slug: 'blog/en/post-2',
      title: 'EN Post 2',
      date: '2026-03-07',
      published: true,
      category: 'export',
      excerpt: 'English export post excerpt',
    },
    {
      slug: 'blog/fr/post-1',
      title: 'FR Post 1',
      date: '2026-03-04',
      published: true,
      category: 'customs',
      excerpt: 'French customs post excerpt',
    },
    {
      slug: 'blog/ru/post-1',
      title: 'RU Post 1',
      date: '2026-03-02',
      published: true,
      category: 'logistics',
      excerpt: 'Russian logistics post excerpt',
    },
    // Additional TR posts for pagination testing (need 10+ total published TR posts)
    {
      slug: 'blog/tr/post-4',
      title: 'TR Post 4',
      date: '2026-02-28',
      published: true,
      category: 'customs',
      excerpt: 'TR customs post',
    },
    {
      slug: 'blog/tr/post-5',
      title: 'TR Post 5',
      date: '2026-02-25',
      published: true,
      category: 'logistics',
      excerpt: 'TR logistics post',
    },
    {
      slug: 'blog/tr/post-6',
      title: 'TR Post 6',
      date: '2026-02-20',
      published: true,
      category: 'import',
      excerpt: 'TR import post 6',
    },
    {
      slug: 'blog/tr/post-7',
      title: 'TR Post 7',
      date: '2026-02-15',
      published: true,
      category: 'export',
      excerpt: 'TR export post 7',
    },
    {
      slug: 'blog/tr/post-8',
      title: 'TR Post 8',
      date: '2026-02-10',
      published: true,
      category: 'customs',
      excerpt: 'TR customs post 8',
    },
    {
      slug: 'blog/tr/post-9',
      title: 'TR Post 9',
      date: '2026-02-05',
      published: true,
      category: 'import',
      excerpt: 'TR import post 9',
    },
    {
      slug: 'blog/tr/post-10',
      title: 'TR Post 10',
      date: '2026-02-01',
      published: true,
      category: 'export',
      excerpt: 'TR export post 10',
    },
  ],
}));

import {
  getPostsByLocale,
  getPostBySlug,
  getPostSlug,
  getPostsByCategory,
  getCategories,
  getPaginatedPosts,
  POSTS_PER_PAGE,
} from '@/lib/blog/utils';

describe('Blog Utils', () => {
  describe('POSTS_PER_PAGE', () => {
    it('should be exported as 9', () => {
      expect(POSTS_PER_PAGE).toBe(9);
    });
  });

  describe('getPostsByLocale', () => {
    it('returns only published Turkish posts', () => {
      const trPosts = getPostsByLocale('tr');
      // 10 published TR posts (draft excluded)
      expect(trPosts).toHaveLength(10);
      trPosts.forEach((post) => {
        expect(post.slug).toMatch(/^blog\/tr\//);
        expect(post.published).toBe(true);
      });
    });

    it('returns only English posts, not Turkish/French/Russian', () => {
      const enPosts = getPostsByLocale('en');
      expect(enPosts).toHaveLength(2);
      enPosts.forEach((post) => {
        expect(post.slug).toMatch(/^blog\/en\//);
      });
    });

    it('sorts posts by date descending (newest first)', () => {
      const trPosts = getPostsByLocale('tr');
      for (let i = 0; i < trPosts.length - 1; i++) {
        expect(new Date(trPosts[i].date).getTime()).toBeGreaterThanOrEqual(
          new Date(trPosts[i + 1].date).getTime()
        );
      }
    });

    it('excludes unpublished posts', () => {
      const trPosts = getPostsByLocale('tr');
      const draftPost = trPosts.find((p) => p.slug === 'blog/tr/draft');
      expect(draftPost).toBeUndefined();
    });
  });

  describe('getPostBySlug', () => {
    it('returns the post with matching slug if published', () => {
      const post = getPostBySlug('tr', 'post-1');
      expect(post).toBeDefined();
      expect(post!.title).toBe('TR Post 1');
      expect(post!.slug).toBe('blog/tr/post-1');
    });

    it('returns undefined for nonexistent slug', () => {
      const post = getPostBySlug('tr', 'nonexistent');
      expect(post).toBeUndefined();
    });

    it('returns undefined for unpublished post', () => {
      const post = getPostBySlug('tr', 'draft');
      expect(post).toBeUndefined();
    });
  });

  describe('getPostSlug', () => {
    it('extracts slug from full path', () => {
      expect(getPostSlug({ slug: 'blog/tr/my-post' })).toBe('my-post');
    });

    it('handles nested slugs', () => {
      expect(getPostSlug({ slug: 'blog/en/2026/nested-post' })).toBe(
        '2026/nested-post'
      );
    });
  });

  describe('getPostsByCategory', () => {
    it('returns only Turkish posts with the specified category', () => {
      const importPosts = getPostsByCategory('tr', 'import');
      importPosts.forEach((post) => {
        expect(post.slug).toMatch(/^blog\/tr\//);
        expect(post.category).toBe('import');
      });
      // post-1, post-3, post-6, post-9 have category 'import'
      expect(importPosts).toHaveLength(4);
    });

    it('returns empty array for non-existent category', () => {
      const posts = getPostsByCategory('tr', 'nonexistent');
      expect(posts).toEqual([]);
    });
  });

  describe('getCategories', () => {
    it('returns deduplicated category slugs from Turkish posts', () => {
      const categories = getCategories('tr');
      expect(categories).toContain('import');
      expect(categories).toContain('export');
      expect(categories).toContain('customs');
      expect(categories).toContain('logistics');
      // Each category appears only once
      const unique = new Set(categories);
      expect(unique.size).toBe(categories.length);
    });

    it('returns categories only for the specified locale', () => {
      const frCategories = getCategories('fr');
      expect(frCategories).toEqual(['customs']);
    });
  });

  describe('getPaginatedPosts', () => {
    it('returns first page with correct number of posts', () => {
      const result = getPaginatedPosts('tr', 1);
      expect(result.posts).toHaveLength(9); // POSTS_PER_PAGE = 9
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(2); // 10 posts / 9 per page = 2 pages
    });

    it('returns second page with remaining posts', () => {
      const result = getPaginatedPosts('tr', 2);
      expect(result.posts).toHaveLength(1); // 10 - 9 = 1 remaining
      expect(result.currentPage).toBe(2);
      expect(result.totalPages).toBe(2);
    });

    it('filters by category when provided', () => {
      const result = getPaginatedPosts('tr', 1, 'import');
      expect(result.posts).toHaveLength(4); // 4 import posts
      expect(result.totalPages).toBe(1); // 4 / 9 = 1 page
      result.posts.forEach((post) => {
        expect(post.category).toBe('import');
      });
    });

    it('returns empty posts array for out-of-range page', () => {
      const result = getPaginatedPosts('tr', 99);
      expect(result.posts).toHaveLength(0);
      expect(result.totalPages).toBe(2);
    });
  });
});
