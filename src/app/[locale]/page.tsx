import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{t('subtitle')}</p>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>
    </div>
  );
}
