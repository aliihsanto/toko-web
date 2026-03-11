'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname as never, { locale: newLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" aria-label={t('label')} />
        }
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{t(locale as Locale)}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className="flex items-center justify-between gap-2"
          >
            <span>{t(loc)}</span>
            {loc === locale && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
