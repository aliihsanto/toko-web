import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{t('subtitle')}</p>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>

      {/* Tall section to enable scroll testing for header shrink behavior */}
      <section className="mt-16 flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4">
        <div className="h-64 w-full rounded-lg bg-muted/50" />
        <div className="mt-8 h-64 w-full rounded-lg bg-muted/50" />
        <div className="mt-8 h-64 w-full rounded-lg bg-muted/50" />
      </section>
    </div>
  );
}
