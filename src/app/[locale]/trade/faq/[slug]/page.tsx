import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/seo/structured-data';
import { getPageMetadata } from '@/lib/seo/metadata';
import { getLocalizedUrl } from '@/lib/i18n-paths';
import { t, getFAQPage } from '@/lib/pseo/utils';
import { faqPages } from '@/data/pseo/faqs';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of faqPages) {
      params.push({ locale, slug: page.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getFAQPage(slug);

  if (!page) {
    return {};
  }

  return getPageMetadata({
    locale,
    path: `/trade/faq/${slug}`,
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
  });
}

const borderColors = [
  'border-l-[#0d7377]',
  'border-l-[#d4613c]',
  'border-l-[#2d8a6e]',
  'border-l-[#e8a840]',
];

const breadcrumbLabels: Record<string, { home: string; trade: string; faq: string }> = {
  tr: { home: 'Ana Sayfa', trade: 'Ticaret', faq: 'SSS' },
  en: { home: 'Home', trade: 'Trade', faq: 'FAQ' },
  fr: { home: 'Accueil', trade: 'Commerce', faq: 'FAQ' },
  ru: { home: 'Главная', trade: 'Торговля', faq: 'ЧЗВ' },
};

export default async function FAQTemplatePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getFAQPage(slug);
  if (!page) {
    notFound();
  }

  const labels = breadcrumbLabels[locale] || breadcrumbLabels.en;
  const title = t(page.content.title, locale);

  // Build FAQ schema data for JSON-LD
  const faqSchemaData = page.content.questions.map((q) => ({
    question: t(q.question, locale),
    answer: t(q.answer, locale),
  }));

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: labels.home, url: getLocalizedUrl('', locale) },
          { name: labels.trade, url: getLocalizedUrl('/trade', locale) },
          { name: labels.faq, url: getLocalizedUrl('/trade/faq', locale) },
          { name: title, url: getLocalizedUrl(`/trade/faq/${slug}`, locale) },
        ])}
      />
      <JsonLd data={getFAQSchema(faqSchemaData)} />

      <PageHero
        title={title}
        subtitle={t(page.content.subtitle, locale)}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: labels.home, href: '/' },
              { label: labels.trade, href: '/trade' },
              { label: labels.faq, href: '/trade/faq' },
              { label: title },
            ]}
          />
        </div>
      </div>

      {/* Intro Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(page.content.intro, locale)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Items Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Sik Sorulan Sorular'
                  : locale === 'fr'
                    ? 'Questions Frequentes'
                    : locale === 'ru'
                      ? 'Часто задаваемые вопросы'
                      : 'Frequently Asked Questions'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d7377] to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {page.content.questions.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div
                  className={`rich-card rounded-2xl border-l-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {t(item.question, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.answer, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      {page.content.relatedLinks.length > 0 && (
        <section className="bg-background py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-10">
                <h2 className="heading-serif text-2xl tracking-tight sm:text-3xl">
                  {locale === 'tr'
                    ? 'Ilgili Konular'
                    : locale === 'fr'
                      ? 'Sujets Connexes'
                      : locale === 'ru'
                        ? 'Связанные темы'
                        : 'Related Topics'}
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-[#e8a840]" />
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {page.content.relatedLinks.map((link, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Link
                    href={link.href as never}
                    className="group flex items-center gap-3 rounded-xl border border-border/60 bg-white/80 px-5 py-4 transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                  >
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {link.label}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={
          locale === 'tr'
            ? 'Daha Fazla Sorunuz Mu Var?'
            : locale === 'fr'
              ? "Vous Avez D'autres Questions?"
              : locale === 'ru'
                ? 'У вас есть другие вопросы?'
                : 'Have More Questions?'
        }
        description={
          locale === 'tr'
            ? 'Uzman ekibimizle iletisime gecin ve ticaret sorulariniza yanit alin.'
            : locale === 'fr'
              ? 'Contactez notre equipe experte et obtenez des reponses a vos questions commerciales.'
              : locale === 'ru'
                ? 'Свяжитесь с нашей экспертной командой и получите ответы на ваши торговые вопросы.'
                : 'Contact our expert team and get answers to your trade questions.'
        }
        buttonText={
          locale === 'tr'
            ? 'Iletisime Gecin'
            : locale === 'fr'
              ? 'Contactez-Nous'
              : locale === 'ru'
                ? 'Связаться с нами'
                : 'Contact Us'
        }
        buttonHref="/contact"
      />
    </>
  );
}
