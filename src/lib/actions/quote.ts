'use server';

import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { quoteSchema } from '@/lib/schemas/quote';
import { sendNotificationEmail } from '@/lib/email/resend';
import { rateLimit } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';
import type { FormState } from './types';

export async function submitQuoteForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const t = await getTranslations('Forms');

  // 1. Rate limiting
  const headerList = await headers();
  const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const { success: withinLimit } = rateLimit(ip);
  if (!withinLimit) {
    return { success: false, message: t('errors.rateLimited') };
  }

  // 2. Honeypot check -- silently succeed to not reveal the trap
  const honeypot = formData.get('website');
  if (honeypot) {
    return { success: true, message: t('success') };
  }

  // 3. reCAPTCHA verification
  const recaptchaToken = formData.get('recaptchaToken') as string;
  const recaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaValid) {
    return { success: false, message: t('errors.recaptchaFailed') };
  }

  // 4. Zod validation
  const rawData = Object.fromEntries(formData);
  const result = quoteSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: t('errors.validationFailed'),
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // 5. Send email
  try {
    await sendNotificationEmail('quote', result.data);
    return { success: true, message: t('success') };
  } catch {
    return { success: false, message: t('errors.sendFailed') };
  }
}
