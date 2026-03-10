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
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isTransparent ? 'bg-transparent py-4' : 'glass-nav py-2 shadow-sm'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span
            className={cn(
              'text-2xl font-extrabold tracking-tight transition-colors duration-300',
              isTransparent ? 'text-white' : 'text-foreground'
            )}
          >
            TOKO
          </span>
          <span className="text-2xl font-extrabold text-amber-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                  isTransparent
                    ? isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                      ? 'text-amber-700 dark:text-amber-500'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {t(`nav.${item.key}`)}
                {isActive && (
                  <span className={cn(
                    'absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full',
                    isTransparent ? 'bg-white' : 'bg-amber-500'
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/contact">
            <Button
              size="sm"
              className={cn(
                'rounded-lg font-semibold transition-all',
                isTransparent
                  ? 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20'
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm'
              )}
            >
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
