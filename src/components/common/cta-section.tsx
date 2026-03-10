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
    <section className="relative overflow-hidden bg-brand-dark py-24">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-dark-text">
            {description}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={buttonHref}>
              <Button
                size="lg"
                className="h-14 bg-amber-600 px-8 text-base font-bold text-white shadow-xl hover:bg-amber-700"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          {note && (
            <p className="mt-4 text-sm text-brand-dark-text-muted">
              {note}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
