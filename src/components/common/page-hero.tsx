import Image from 'next/image';
import { ScrollReveal } from '@/components/common/scroll-reveal';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  badge?: string;
}

export function PageHero({ title, subtitle, backgroundImage, badge }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-slate-900">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            width={2070}
            height={800}
            className="h-full w-full object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/60" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <ScrollReveal>
              <span className="mb-6 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-sm">
                {badge}
              </span>
            </ScrollReveal>
          )}
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
