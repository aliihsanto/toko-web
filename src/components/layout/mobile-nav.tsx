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
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Open menu" />
          }
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-background p-0">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle className="heading-serif text-left text-xl tracking-tight">
              Toko<span className="text-[#d4613c]">.</span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium transition-colors hover:bg-muted',
                  pathname === item.href
                    ? 'bg-primary/8 text-primary'
                    : 'text-foreground/70'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border px-6 py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {tLang('label')}
            </p>
            <div className="flex flex-wrap gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-sm transition-colors',
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

          <div className="mt-auto border-t border-border px-6 py-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
            >
              <Button className="w-full rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
                {t('cta')}
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
