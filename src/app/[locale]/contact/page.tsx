import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactPage');

  return (
    <div>
      {/* Header with dark bg */}
      <section className="bg-[#14202e] pb-32 pt-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="rounded-full border border-amber-600/30 bg-amber-600/10 px-3 py-1 text-sm font-bold uppercase tracking-wider text-amber-500">
              {t('title')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-blue-200">{t('subtitle')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto -mt-20 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info cards */}
          <div className="space-y-6 lg:col-span-5">
            <ScrollReveal>
              {[
                { icon: Phone, value: t('info.phone'), label: 'phone', bg: 'bg-card' },
                { icon: Mail, value: t('info.email'), label: 'email', bg: 'bg-card' },
                { icon: MapPin, value: t('info.address'), label: 'address', bg: 'bg-[#1e3043] text-white' },
              ].map((item) => {
                const Icon = item.icon;
                const isDark = item.label === 'address';
                return (
                  <div key={item.label} className={`flex items-center gap-4 rounded-2xl border p-6 shadow-sm ${item.bg}`}>
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isDark ? 'bg-amber-600/20' : 'bg-primary/5'}`}>
                      <Icon className={`h-6 w-6 ${isDark ? 'text-amber-500' : 'text-primary'}`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </div>
                      <div className={`font-semibold ${isDark ? 'text-white' : ''}`}>{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl border bg-card p-8 shadow-sm lg:p-10">
                <h2 className="text-xl font-extrabold">{t('title')}</h2>
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-12 rounded-lg border bg-muted/30 animate-pulse" />
                    <div className="h-12 rounded-lg border bg-muted/30 animate-pulse" />
                  </div>
                  <div className="h-12 rounded-lg border bg-muted/30 animate-pulse" />
                  <div className="h-12 rounded-lg border bg-muted/30 animate-pulse" />
                  <div className="h-32 rounded-lg border bg-muted/30 animate-pulse" />
                  <Button disabled className="w-full bg-amber-600 text-white hover:bg-amber-700">
                    <Send className="mr-2 h-4 w-4" />
                    {t('comingSoon')}
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>24 saat icinde donus yapilir</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
