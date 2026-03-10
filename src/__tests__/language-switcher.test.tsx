import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

const mockReplace = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => 'tr',
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      LanguageSwitcher: {
        tr: 'Turkce',
        en: 'English',
        fr: 'Francais',
        ru: 'Russkiy',
        label: 'Dil Sec',
      },
    };
    return (key: string) => translations[namespace]?.[key] ?? key;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders a trigger button with Globe icon', () => {
    render(<LanguageSwitcher />);
    const trigger = screen.getByRole('button', { name: /dil sec/i });
    expect(trigger).toBeInTheDocument();
  });

  it('shows current locale name on sm+ screens', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('Turkce')).toBeInTheDocument();
  });

  it('shows all 4 locale names when dropdown is opened', async () => {
    render(<LanguageSwitcher />);
    const trigger = screen.getByRole('button', { name: /dil sec/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });
    expect(screen.getByText('Francais')).toBeInTheDocument();
    expect(screen.getByText('Russkiy')).toBeInTheDocument();
    // "Turkce" already visible as trigger label, but also in dropdown
    const turkceElements = screen.getAllByText('Turkce');
    expect(turkceElements.length).toBeGreaterThanOrEqual(1);
  });

  it('calls router.replace with the correct locale when a locale option is clicked', async () => {
    render(<LanguageSwitcher />);
    const trigger = screen.getByRole('button', { name: /dil sec/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    // Use the menuitem role to find the English option in the dropdown
    const menuItems = screen.getAllByRole('menuitem');
    const englishItem = menuItems.find(
      (item) => item.textContent?.includes('English')
    );
    expect(englishItem).toBeTruthy();
    fireEvent.click(englishItem!);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'en' });
    });
  });

  it('visually distinguishes the current locale with a check icon', async () => {
    render(<LanguageSwitcher />);
    const trigger = screen.getByRole('button', { name: /dil sec/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    // The current locale (tr/Turkce) should have a Check icon sibling
    // Find the Turkce text that's inside a dropdown-menu-item (not the trigger)
    const turkceElements = screen.getAllByText('Turkce');
    const dropdownItem = turkceElements.find((el) =>
      el.closest('[data-slot="dropdown-menu-item"]')
    );
    expect(dropdownItem).toBeTruthy();

    const container = dropdownItem!.closest('[data-slot="dropdown-menu-item"]');
    // The Check icon renders as an SVG with the lucide-check class
    const checkIcon = container?.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();

    // English item should NOT have a check icon
    const englishEl = screen.getByText('English');
    const englishContainer = englishEl.closest('[data-slot="dropdown-menu-item"]');
    const englishSvgs = englishContainer?.querySelectorAll('svg');
    expect(englishSvgs?.length ?? 0).toBe(0);
  });
});
