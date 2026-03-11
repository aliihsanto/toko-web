import Image from 'next/image';
import { WaveDivider } from '@/components/common/wave-divider';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  badge?: string;
}

export function PageHero({ title, subtitle, backgroundImage, badge }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden">
      {/* Rich gradient mesh background */}
      <div className="absolute inset-0 mesh-hero" />

      {/* Decorative shapes — larger & more vivid */}
      <div className="absolute -right-16 -top-16 h-[400px] w-[400px] rounded-full bg-[#0d7377]/10 blur-[100px]" />
      <div className="absolute -bottom-16 -left-16 h-[350px] w-[350px] rounded-full bg-[#d4613c]/8 blur-[80px]" />
      <div className="absolute right-1/3 top-1/4 h-[250px] w-[250px] rounded-full bg-[#e8a840]/8 blur-[60px]" />

      {/* Subtle background image texture */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImage}
            alt={title}
            width={2070}
            height={800}
            className="h-full w-full object-cover opacity-[0.08]"
            priority
          />
        </div>
      )}

      {/* Dot pattern for texture */}
      <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.03]" />

      {/* Content — centered for impact, renders immediately (no ScrollReveal for LCP) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-32">
        {badge && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {badge}
          </span>
        )}
        <h1 className="heading-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#0d7377] to-[#d4613c]" />
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {/* Wave divider to next section */}
      <WaveDivider color="#fefcf9" variant="gentle" />
    </section>
  );
}
