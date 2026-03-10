'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const localeNames: Record<Locale, string> = {
  tr: 'Turkce',
  en: 'English',
  fr: 'Francais',
  ru: 'Russkiy',
};

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <footer className="border-t bg-muted/50 dark:bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main footer grid: 4 columns on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold">TOKO</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {t('about.description')}
            </p>
            {/* Social media icons */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.linkedin')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.twitter')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.instagram')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {t('services.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('services.import')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('services.export')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('services.transitTrade')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('services.sourcing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Blog */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {t('blog.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('blog.latest')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('blog.categories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {t('contact.title')}
            </h4>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">
                {t('contact.address')}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <a
                  href="tel:+902120000000"
                  className="transition-colors hover:text-primary"
                >
                  {t('contact.phone')}
                </a>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <a
                  href="mailto:info@toko.com.tr"
                  className="transition-colors hover:text-primary"
                >
                  {t('contact.email')}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom bar: copyright + language links */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {t('copyright')}</p>

          {/* Secondary language switcher - simple text buttons */}
          <div className="flex gap-4">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => router.replace(pathname, { locale: loc })}
                className={cn(
                  'transition-colors hover:text-primary',
                  locale === loc && 'font-medium text-primary'
                )}
              >
                {localeNames[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
