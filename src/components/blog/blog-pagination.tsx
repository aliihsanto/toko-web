import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale: string;
  labels: {
    previous: string;
    next: string;
    page: string;
  };
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath,
  locale,
  labels,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  function getPageUrl(page: number) {
    if (page === 1) return `/${locale}/blog`;
    return `/${locale}${basePath}/${page}`;
  }

  // Build page numbers: 1 ... current-1, current, current+1 ... last
  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];
  const showPages = new Set<number>();

  showPages.add(1);
  showPages.add(totalPages);
  if (currentPage > 1) showPages.add(currentPage - 1);
  showPages.add(currentPage);
  if (currentPage < totalPages) showPages.add(currentPage + 1);

  const sortedPages = [...showPages].sort((a, b) => a - b);

  for (let i = 0; i < sortedPages.length; i++) {
    if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) {
      pages.push(i === 1 ? 'ellipsis-start' : 'ellipsis-end');
    }
    pages.push(sortedPages[i]);
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous */}
      {isFirst ? (
        <span className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground opacity-50">
          <ChevronLeft className="h-4 w-4" />
          {labels.previous}
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
          {labels.previous}
        </Link>
      )}

      {/* Page numbers */}
      {pages.map((page) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <span
              key={page}
              className="px-2 py-2 text-sm text-muted-foreground"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return isActive ? (
          <span
            key={page}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white"
            aria-current="page"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {isLast ? (
        <span className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground opacity-50">
          {labels.next}
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          {labels.next}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
