'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/types';
import { Separator } from '@/components/ui/separator';

const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  fr: 'Français',
  ru: 'Русский',
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
              <a
                href="https://maps.app.goo.gl/V4V6Pw7SKXjMv92q8"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer text-sm leading-relaxed text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {t('contact.address')}
              </a>
              <p className="mt-2.5 text-sm text-muted-foreground">
                <a href="tel:+902124506020" className="transition-colors duration-200 hover:text-primary">
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
