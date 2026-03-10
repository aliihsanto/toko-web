'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ArrowRight } from 'lucide-react';

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
  const t = useTranslations('Header');
  const pathname = usePathname();

  return (
    <header
      role="banner"
      className="fixed top-0 right-0 left-0 z-50 glass-nav py-3"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5">
          <span className="heading-serif text-2xl tracking-tight text-foreground">
            Toko
          </span>
          <span className="heading-serif text-2xl text-[#d4613c]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-200',
                  isActive
                    ? 'bg-primary/8 text-primary'
                    : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href="/contact">
            <Button
              size="sm"
              className="rounded-full font-medium bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t('cta')}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  );
}
