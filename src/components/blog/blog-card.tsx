import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categoryLabel: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  locale: string;
  readingTime: number;
  readMoreLabel: string;
  readingTimeLabel: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  category,
  categoryLabel,
  slug,
  image,
  imageAlt,
  locale,
  readingTime,
  readMoreLabel,
  readingTimeLabel,
}: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return (
    <article className="rich-card group overflow-hidden rounded-2xl">
      {image && (
        <Link href={`/blog/${slug}`} className="relative block h-48 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            width={800}
            height={400}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm shadow-sm">
            {categoryLabel}
          </span>
        </Link>
      )}
      {!image && (
        <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-[#d4613c]/5">
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm shadow-sm">
            {categoryLabel}
          </span>
          <span className="text-5xl text-primary/20">{category.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTimeLabel}
          </span>
        </div>
        <h2 className="mt-3 heading-serif text-lg line-clamp-2">
          <Link
            href={`/blog/${slug}`}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <span>{readMoreLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
