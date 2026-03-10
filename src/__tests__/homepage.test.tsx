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

describe('Homepage (PAGE-01)', () => {
  it.todo('renders services section with cards linking to /services/[slug]');
  it.todo('renders trust signals section with stats');
  it.todo('renders sectors preview section with amber background');
  it.todo('renders CTA section');
  it.todo('all visible text uses translation keys (no hardcoded strings)');
});
