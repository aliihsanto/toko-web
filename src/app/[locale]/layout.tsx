import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageTransition } from '@/components/common/page-transition';
import { RecaptchaProvider } from '@/providers/recaptcha-provider';
import { WhatsAppButton } from '@/components/common/whatsapp-button';
import { BASE_URL, LOCALE_TO_OG, getAlternates } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getOrganizationSchema } from '@/lib/seo/structured-data';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t('title'),
      template: `%s | Toko Trading`,
    },
    description: t('description'),
    alternates: getAlternates(locale, ''),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'Toko Trading',
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      locale: LOCALE_TO_OG[locale] || locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        disableTransitionOnChange
      >
        <RecaptchaProvider>
          <JsonLd data={getOrganizationSchema(locale)} />
          <Header />
          <main className="min-h-screen pt-14">
            <PageTransition locale={locale}>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
        </RecaptchaProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
