'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useLocale } from 'next-intl';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    // In development without reCAPTCHA keys, render children without provider
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      language={locale}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
