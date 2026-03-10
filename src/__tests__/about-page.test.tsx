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

describe('About Page (PAGE-02)', () => {
  it.todo('renders PageHero with translated title and subtitle');
  it.todo('renders company overview section with paragraphs');
  it.todo('renders vision and mission cards');
  it.todo('renders company values section with amber background');
  it.todo('renders stats section with dark navy background');
  it.todo('renders CTA section linking to /contact');
  it.todo('renders breadcrumb with Home > About Us');
});
