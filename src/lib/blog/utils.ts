import { posts } from '#site/content';

export const POSTS_PER_PAGE = 9;

/**
 * Get all published posts for a specific locale, sorted by date descending.
 * Velite s.path() generates slugs like "blog/tr/my-post".
 */
export function getPostsByLocale(locale: string) {
  return posts
    .filter(
      (post) => post.slug.startsWith(`blog/${locale}/`) && post.published
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/**
 * Get a single published post by locale and slug.
 * Returns undefined if not found or not published.
 */
export function getPostBySlug(locale: string, slug: string) {
  return posts.find(
    (post) => post.slug === `blog/${locale}/${slug}` && post.published
  );
}

/**
 * Extract the post-specific slug from the full Velite path.
 * "blog/tr/my-post" -> "my-post"
 */
export function getPostSlug(post: { slug: string }) {
  return post.slug.split('/').slice(2).join('/');
}

/**
 * Get all published posts for a locale filtered by category.
 */
export function getPostsByCategory(locale: string, category: string) {
  return getPostsByLocale(locale).filter(
    (post) => post.category === category
  );
}

/**
 * Get deduplicated category slugs from published posts in a locale.
 */
export function getCategories(locale: string): string[] {
  const localePosts = getPostsByLocale(locale);
  return [...new Set(localePosts.map((p) => p.category))];
}

/**
 * Get paginated posts for a locale, optionally filtered by category.
 * Returns posts array, total page count, and current page number.
 */
export function getPaginatedPosts(
  locale: string,
  page: number,
  category?: string
) {
  const filtered = category
    ? getPostsByCategory(locale, category)
    : getPostsByLocale(locale);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: filtered.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: page,
  };
}
