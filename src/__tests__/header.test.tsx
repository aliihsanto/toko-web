import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      Header: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.services': 'Services',
        'nav.sectors': 'Sectors',
        'nav.references': 'References',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        cta: 'Get in Touch',
      },
    };
    return (key: string) => translations[namespace]?.[key] ?? key;
  },
  useLocale: () => 'en',
}));

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock child components to isolate header logic
vi.mock('@/components/layout/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

vi.mock('@/components/layout/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

vi.mock('@/components/layout/mobile-nav', () => ({
  MobileNav: () => <div data-testid="mobile-nav" />,
}));

describe('Header', () => {
  it('renders the TOKO logo text', () => {
    render(<Header />);
    expect(screen.getByText('TOKO')).toBeInTheDocument();
  });

  it('renders all 7 navigation items', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Sectors')).toBeInTheDocument();
    expect(screen.getByText('References')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders LanguageSwitcher component', () => {
    render(<Header />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('renders ThemeToggle component', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('renders MobileNav component', () => {
    render(<Header />);
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  it('renders CTA button with translated text', () => {
    render(<Header />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('has role="banner" for accessibility', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('logo links to the homepage', () => {
    render(<Header />);
    const logoLink = screen.getByText('TOKO').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('has a nav element with aria-label for main navigation', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });
});
