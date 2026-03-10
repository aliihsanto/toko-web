'use client';

import { useState } from 'react';
import { CategoryFilter } from './category-filter';
import { BlogCard } from './blog-card';

interface PostData {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  readingTime: number;
}

interface BlogListingClientProps {
  posts: PostData[];
  categories: string[];
  categoryLabels: Record<string, string>;
  allLabel: string;
  locale: string;
  readMoreLabel: string;
  readingTimeTemplate: string;
  noPostsMessage: string;
  noPostsInCategoryMessage: string;
}

export function BlogListingClient({
  posts,
  categories,
  categoryLabels,
  allLabel,
  locale,
  readMoreLabel,
  readingTimeTemplate,
  noPostsMessage,
  noPostsInCategoryMessage,
}: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mb-10 flex justify-center">
          <CategoryFilter
            categories={categories}
            categoryLabels={categoryLabels}
            allLabel={allLabel}
            onCategoryChange={setActiveCategory}
          />
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            // Extract the post-specific slug (remove "blog/{locale}/" prefix)
            const postSlug = post.slug.split('/').slice(2).join('/');
            return (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                categoryLabel={categoryLabels[post.category] || post.category}
                slug={postSlug}
                image={post.image}
                imageAlt={post.imageAlt}
                locale={locale}
                readingTime={post.readingTime}
                readMoreLabel={readMoreLabel}
                readingTimeLabel={readingTimeTemplate.replace(
                  '{minutes}',
                  String(post.readingTime)
                )}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-primary/[0.03] via-transparent to-[#d4613c]/[0.03] p-12 text-center shadow-sm">
          <p className="text-muted-foreground">
            {activeCategory ? noPostsInCategoryMessage : noPostsMessage}
          </p>
        </div>
      )}
    </>
  );
}
