import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
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
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 py-24">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-orange-800/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-amber-100">
            {description}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={buttonHref}>
              <Button
                size="lg"
                className="h-14 rounded-xl bg-white px-8 text-base font-bold text-amber-700 shadow-xl shadow-amber-900/20 transition-all hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-2xl"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          {note && (
            <p className="mt-4 text-sm text-amber-200/70">
              {note}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
