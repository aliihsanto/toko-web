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
    <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-brand-dark">
      {/* Optional background image with overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            width={2070}
            height={800}
            className="h-full w-full object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark/80" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <ScrollReveal>
              <span className="mb-6 inline-block rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-amber-500 backdrop-blur-sm">
                {badge}
              </span>
            </ScrollReveal>
          )}
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-brand-dark-text">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
