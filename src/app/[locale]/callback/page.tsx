import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { Clock, Shield, Users } from 'lucide-react';
import { CallbackForm } from '@/components/forms/callback-form';

export default async function CallbackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CallbackPage');
  const tForm = await getTranslations('Forms.callback');

  const benefits = [
    {
      icon: Clock,
      title: t('benefits.fastResponse'),
      description: t('benefits.fastResponseDesc'),
      bg: 'bg-[#d4613c]/10',
      iconColor: 'text-[#d4613c]',
    },
    {
      icon: Shield,
      title: t('benefits.noObligation'),
      description: t('benefits.noObligationDesc'),
      bg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: Users,
      title: t('benefits.expertConsultation'),
      description: t('benefits.expertConsultationDesc'),
      bg: 'bg-[#2d8a6e]/10',
      iconColor: 'text-[#2d8a6e]',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-24 mesh-hero">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d4613c]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#e8a840]/8 blur-[100px]" />
        <div className="absolute inset-0 dot-grid text-[#d4613c]/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d4613c]/15 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#d4613c] backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4613c]" />
              {t('badge')}
            </span>
            <h1 className="mt-4 heading-serif text-4xl text-foreground sm:text-5xl">{t('title')}</h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            <p className="mt-6 text-lg text-muted-foreground">{t('subtitle')}</p>
          </ScrollReveal>
        </div>

        <WaveDivider color="#fefcf9" variant="gentle" />
      </section>

      {/* Content */}
      <section className="mx-auto -mt-20 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="rich-card rounded-2xl border-t-4 border-t-[#d4613c] p-8 lg:p-10">
                <h2 className="heading-serif text-xl">{tForm('title')}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
                <div className="mt-6">
                  <CallbackForm />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Benefits side panel */}
          <div className="space-y-6 lg:col-span-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={benefit.title} delay={0.1 * (index + 1)}>
                  <div className="rich-card rounded-2xl p-6">
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg}`}>
                      <Icon className={`h-6 w-6 ${benefit.iconColor}`} />
                    </div>
                    <h3 className="heading-serif text-lg text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
