import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhatsAppButton } from '@/components/common/whatsapp-button';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      whatsappChat: 'Chat on WhatsApp',
    };
    return translations[key] ?? key;
  },
}));

// Mock framer-motion to render plain elements
vi.mock('framer-motion', () => ({
  motion: {
    a: ({
      children,
      initial,
      animate,
      transition,
      whileHover,
      whileTap,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & Record<string, unknown>) => (
      <a {...props}>{children}</a>
    ),
  },
}));

describe('WhatsAppButton', () => {
  it('renders an anchor element with href containing wa.me', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });

  it('has target="_blank" and rel="noopener noreferrer"', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has aria-label for accessibility', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Chat on WhatsApp');
  });

  it('has the WhatsApp green background class', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('bg-[#25D366]');
  });
});
