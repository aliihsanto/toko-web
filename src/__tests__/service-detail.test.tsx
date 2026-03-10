import { describe, it, expect, vi } from 'vitest';

// Mocks for server components
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => (key: string) => key),
  setRequestLocale: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('@/components/common/scroll-reveal', () => ({
  ScrollReveal: ({ children }: any) => <div>{children}</div>,
}));

describe('Service Detail Pages (PAGE-04)', () => {
  it.todo('exports generateStaticParams returning 4 service slugs');
  it.todo('exports dynamicParams = false');
  it.todo('renders PageHero with service-specific title');
  it.todo('renders overview section with paragraphs');
  it.todo('renders features grid with 5 features');
  it.todo('renders process steps section');
  it.todo('renders CTA section linking to /contact');
  it.todo('renders breadcrumb with Home > Services > [Service Name]');
});
