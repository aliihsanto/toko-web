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

describe('Services Overview (PAGE-03)', () => {
  it.todo('renders PageHero with translated title');
  it.todo('renders all 4 service cards with detail links');
  it.todo('renders "Why Choose Our Services" section');
  it.todo('renders CTA section');
  it.todo('service cards link to /services/[slug]');
});
