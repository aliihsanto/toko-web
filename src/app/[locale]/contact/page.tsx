import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=41.0639238,28.8054737&z=16&output=embed';

const GOOGLE_MAPS_LINK_URL =
  'https://maps.app.goo.gl/V4V6Pw7SKXjMv92q8';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return getPageMetadata({
    locale,
    path: '/contact',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactPage');
  const tNav = await getTranslations('Header.nav');
  const tForm = await getTranslations('Forms.contact');

  const mapLabels: Record<string, { directions: string; openMap: string }> = {
    tr: { directions: 'Yol Tarifi Al', openMap: 'Haritada Aç' },
    en: { directions: 'Get Directions', openMap: 'Open in Maps' },
    fr: { directions: 'Obtenir l\'itinéraire', openMap: 'Ouvrir dans Maps' },
    ru: { directions: 'Проложить маршрут', openMap: 'Открыть на карте' },
  };
  const mapLabel = mapLabels[locale] || mapLabels.tr;

  return (
    <div>
      <JsonLd data={getBreadcrumbSchema([
        { name: tNav('home'), url: `${BASE_URL}/${locale}` },
        { name: tNav('contact'), url: `${BASE_URL}/${locale}/contact` },
      ])} />
      {/* Header -- mesh gradient */}
      <section className="relative overflow-hidden pb-44 pt-24 mesh-hero">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#d4613c]/8 blur-[100px]" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('title')}
          </span>
          <h1 className="mt-4 heading-serif text-4xl text-foreground sm:text-5xl">{t('title')}</h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
          <p className="mt-6 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <WaveDivider color="#fefcf9" variant="gentle" />
      </section>

      {/* Content */}
      <section className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info cards */}
          <div className="space-y-6 lg:col-span-5">
            <ScrollReveal>
              {[
                { icon: Phone, value: t('info.phone'), label: 'phone', href: 'tel:+902124506020', bg: 'bg-primary/10', iconColor: 'text-primary', border: 'border-l-4 border-l-primary' },
                { icon: Mail, value: t('info.email'), label: 'email', href: 'mailto:info@toko.com.tr', bg: 'bg-[#d4613c]/10', iconColor: 'text-[#d4613c]', border: 'border-l-4 border-l-[#d4613c]' },
                { icon: MapPin, value: t('info.address'), label: 'address', href: GOOGLE_MAPS_LINK_URL, bg: 'bg-[#2d8a6e]/10', iconColor: 'text-[#2d8a6e]', border: 'border-l-4 border-l-[#2d8a6e]' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'address' ? '_blank' : undefined}
                    rel={item.label === 'address' ? 'noopener noreferrer' : undefined}
                    className={`rich-card flex cursor-pointer items-center gap-4 rounded-2xl ${item.border} p-6 transition-all hover:shadow-lg`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                      <Icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</div>
                      <div className="font-semibold text-foreground">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="rich-card rounded-2xl border-t-4 border-t-primary p-8 lg:p-10">
                <h2 className="heading-serif text-xl">{tForm('title')}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
                <div className="mt-6">
                  <ContactForm />
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{t('responseTime')}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rich-card overflow-hidden rounded-2xl border-t-4 border-t-[#2d8a6e]">
            <div className="relative">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Toko Trading - Office Location"
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2d8a6e]" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('info.address')}
                </p>
              </div>
              <a
                href={GOOGLE_MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#2d8a6e] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2d8a6e]/90 hover:shadow-lg"
              >
                <ExternalLink className="h-4 w-4" />
                {mapLabel.directions}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
