import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

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

  return (
    <div>
      <JsonLd data={getBreadcrumbSchema([
        { name: tNav('home'), url: `${BASE_URL}/${locale}` },
        { name: tNav('contact'), url: `${BASE_URL}/${locale}/contact` },
      ])} />
      {/* Header -- mesh gradient */}
      <section className="relative overflow-hidden pb-32 pt-24 mesh-hero">
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
      <section className="mx-auto -mt-20 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info cards */}
          <div className="space-y-6 lg:col-span-5">
            <ScrollReveal>
              {[
                { icon: Phone, value: t('info.phone'), label: 'phone', bg: 'bg-primary/10', iconColor: 'text-primary', border: 'border-l-4 border-l-primary' },
                { icon: Mail, value: t('info.email'), label: 'email', bg: 'bg-[#d4613c]/10', iconColor: 'text-[#d4613c]', border: 'border-l-4 border-l-[#d4613c]' },
                { icon: MapPin, value: t('info.address'), label: 'address', bg: 'bg-[#2d8a6e]/10', iconColor: 'text-[#2d8a6e]', border: 'border-l-4 border-l-[#2d8a6e]' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className={`rich-card flex items-center gap-4 rounded-2xl ${item.border} p-6`}>
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                      <Icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</div>
                      <div className="font-semibold text-foreground">{item.value}</div>
                    </div>
                  </div>
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
    </div>
  );
}
