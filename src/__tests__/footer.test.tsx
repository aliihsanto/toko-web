import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      Footer: {
        'about.description':
          'Toko Trading is your trusted partner in international trade and sourcing.',
        'services.title': 'Services',
        'services.import': 'Import',
        'services.export': 'Export',
        'services.transitTrade': 'Transit Trade',
        'services.sourcing': 'Sourcing',
        'forms.title': 'Get in Touch',
        'forms.contact': 'Contact Form',
        'forms.quote': 'Request a Quote',
        'forms.sourcing': 'Sourcing Request',
        'forms.callback': 'Request Callback',
        'contact.title': 'Contact',
        'contact.address': 'Ziya Gökalp Mah. Süleyman Demirel Blv. The Office No: 7/E Unit: 165, Başakşehir / Istanbul, Turkey',
        'contact.phone': '+90 (212) 450 60 20',
        'contact.email': 'info@toko.com.tr',
        copyright: '2026 Toko Trading. All rights reserved.',
        'social.linkedin': 'LinkedIn',
        'social.twitter': 'Twitter',
        'social.instagram': 'Instagram',
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

// Mock separator
vi.mock('@/components/ui/separator', () => ({
  Separator: ({ className }: any) => (
    <hr data-testid="separator" className={className} />
  ),
}));

describe('Footer', () => {
  it('renders the Toko logo text in the about column', () => {
    render(<Footer />);
    expect(screen.getByText('Toko')).toBeInTheDocument();
  });

  it('renders all 4 column headings', () => {
    render(<Footer />);
    // About column has the description text
    expect(
      screen.getByText(
        'Toko Trading is your trusted partner in international trade and sourcing.'
      )
    ).toBeInTheDocument();
    // Services, Get in Touch, Contact headings
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact info (address, phone, email)', () => {
    render(<Footer />);
    expect(screen.getByText(/Başakşehir/)).toBeInTheDocument();
    expect(screen.getByText('+90 (212) 450 60 20')).toBeInTheDocument();
    expect(screen.getByText('info@toko.com.tr')).toBeInTheDocument();
  });

  it('renders phone with tel: link and email with mailto: link', () => {
    render(<Footer />);
    const phoneLink = screen.getByText('+90 (212) 450 60 20').closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:+902124506020');
    const emailLink = screen.getByText('info@toko.com.tr').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@toko.com.tr');
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/2026 Toko Trading\. All rights reserved\./)
    ).toBeInTheDocument();
  });

  it('renders language switcher buttons for all 4 locales', () => {
    render(<Footer />);
    expect(screen.getByText('Türkçe')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
  });

  it('highlights the current locale in the language switcher', () => {
    render(<Footer />);
    const englishButton = screen.getByText('English');
    expect(englishButton).toHaveClass('text-primary', 'font-medium');
  });

  it('renders a semantic footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders service links', () => {
    render(<Footer />);
    expect(screen.getByText('Import')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Transit Trade')).toBeInTheDocument();
    expect(screen.getByText('Sourcing')).toBeInTheDocument();
  });

  it('renders form page links', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Form')).toBeInTheDocument();
    expect(screen.getByText('Request a Quote')).toBeInTheDocument();
    expect(screen.getByText('Sourcing Request')).toBeInTheDocument();
    expect(screen.getByText('Request Callback')).toBeInTheDocument();
  });
});
