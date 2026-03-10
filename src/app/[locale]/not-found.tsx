import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">{t('title')}</p>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>
      <a href="/" className="mt-6 text-primary underline">
        {t('backHome')}
      </a>
    </div>
  );
}
