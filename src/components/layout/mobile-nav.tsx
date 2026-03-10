'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'sectors', href: '/sectors' },
  { key: 'references', href: '/references' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Header');
  const tLang = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Open menu" />
          }
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="text-left font-bold tracking-wider uppercase">
              TOKO
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex min-h-12 items-center rounded-md px-3 text-base font-medium transition-colors hover:bg-muted',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground/80'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="border-t px-6 py-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {tLang('label')}
            </p>
            <div className="flex flex-wrap gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    loc === locale
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  )}
                >
                  {tLang(loc)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-auto border-t px-6 py-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
            >
              <Button className="w-full">{t('cta')}</Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
