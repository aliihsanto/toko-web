interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TableOfContentsProps {
  toc: TocEntry[];
  title?: string;
}

function TocItems({ items }: { items: TocEntry[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {item.title}
          </a>
          {item.items && item.items.length > 0 && (
            <ul className="ml-4 mt-2 space-y-1.5">
              {item.items.map((sub) => (
                <li key={sub.url}>
                  <a
                    href={sub.url}
                    className="text-sm text-muted-foreground/80 transition-colors hover:text-primary"
                  >
                    {sub.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ toc, title }: TableOfContentsProps) {
  if (!toc || toc.length === 0) return null;

  return (
    <aside className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h3>
      )}
      <div className="border-l-2 border-primary/10 pl-4">
        <TocItems items={toc} />
      </div>
    </aside>
  );
}
