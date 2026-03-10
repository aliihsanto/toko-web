'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'sectors', href: '/sectors' },
  { key: 'references', href: '/references' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('Header');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showSolid = !isHome || scrolled;

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        showSolid ? 'glass-nav py-1 shadow-sm' : 'bg-transparent py-3'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span
            className={cn(
              'text-3xl font-extrabold tracking-tighter transition-all duration-300',
              showSolid ? 'text-foreground' : 'text-white'
            )}
          >
            TOKO
          </span>
          <div
            className={cn(
              'mt-2 h-1.5 w-1.5 rounded-full transition-colors',
              showSolid ? 'bg-amber-600' : 'bg-white'
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200',
                pathname === item.href
                  ? showSolid
                    ? 'text-primary'
                    : 'text-amber-500'
                  : showSolid
                    ? 'text-muted-foreground hover:text-primary'
                    : 'text-gray-200 hover:text-white'
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/contact">
            <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-700">
              {t('cta')}
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  );
}
