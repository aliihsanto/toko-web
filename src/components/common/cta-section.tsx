import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  note?: string;
}

export function CTASection({ title, description, buttonText, buttonHref, note }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a5c5f] via-[#0d7377] to-[#0f8a8e] py-28">
      {/* Wave divider at top */}
      <WaveDivider flip color="#fefcf9" variant="steep" />

      {/* Decorative mesh */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#d4613c]/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8a840]/[0.06] blur-[80px]" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-grid text-white/[0.04]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="heading-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
            {description}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={buttonHref}>
              <Button
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-base font-semibold text-[#0a5c5f] shadow-xl shadow-black/15 transition-all hover:-translate-y-1 hover:bg-white/95 hover:shadow-2xl"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          {note && (
            <p className="mt-5 text-sm text-white/40">
              {note}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
