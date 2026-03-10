import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { SourcingForm } from '@/components/forms/sourcing-form';

export default async function SourcingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SourcingPage');
  const tForm = await getTranslations('Forms.sourcing');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-24 mesh-hero">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#2d8a6e]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute inset-0 dot-grid text-[#2d8a6e]/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2d8a6e]/15 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#2d8a6e] backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2d8a6e]" />
              {t('badge')}
            </span>
            <h1 className="mt-4 heading-serif text-4xl text-foreground sm:text-5xl">{t('title')}</h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
            <p className="mt-6 text-lg text-muted-foreground">{t('subtitle')}</p>
          </ScrollReveal>
        </div>

        <WaveDivider color="#fefcf9" variant="gentle" />
      </section>

      {/* Content */}
      <section className="mx-auto -mt-20 max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rich-card rounded-2xl border-t-4 border-t-[#2d8a6e] p-8 lg:p-10">
            <h2 className="heading-serif text-xl">{tForm('title')}</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
            <div className="mt-6">
              <SourcingForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
