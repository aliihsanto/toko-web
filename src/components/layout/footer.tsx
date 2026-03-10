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
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-secondary to-[#ebe5dc]">
      {/* Decorative mesh */}
      <div className="absolute inset-0">
        <div className="absolute -right-32 top-0 h-[300px] w-[300px] rounded-full bg-[#0d7377]/[0.04] blur-[80px]" />
        <div className="absolute -left-32 bottom-0 h-[250px] w-[250px] rounded-full bg-[#d4613c]/[0.04] blur-[60px]" />
      </div>
      <div className="absolute inset-0 dot-grid text-foreground/[0.015]" />

      {/* Gradient accent strip at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0d7377] via-[#d4613c] to-[#e8a840]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="heading-serif text-2xl">Toko<span className="text-[#d4613c]">.</span></h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t('about.description')}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.linkedin')}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:shadow-md"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.twitter')}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:shadow-md"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.instagram')}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-muted-foreground transition-all hover:bg-[#d4613c]/10 hover:text-[#d4613c] hover:shadow-md"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('services.title')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('services.import')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('services.export')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('services.transitTrade')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('services.sourcing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch (Form Pages) */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('forms.title')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('forms.contact')}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('forms.quote')}
                </Link>
              </li>
              <li>
                <Link href="/sourcing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('forms.sourcing')}
                </Link>
              </li>
              <li>
                <Link href="/callback" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('forms.callback')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('contact.title')}
            </h4>
            <address className="not-italic">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('contact.address')}
              </p>
              <p className="mt-2.5 text-sm text-muted-foreground">
                <a href="tel:+902120000000" className="transition-colors duration-200 hover:text-primary">
                  {t('contact.phone')}
                </a>
              </p>
              <p className="mt-2.5 text-sm text-muted-foreground">
                <a href="mailto:info@toko.com.tr" className="transition-colors duration-200 hover:text-primary">
                  {t('contact.email')}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-10 bg-border/60" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {t('copyright')}</p>

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
