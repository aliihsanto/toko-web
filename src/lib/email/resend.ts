import { Resend } from 'resend';
import type { ContactFormData } from '@/lib/schemas/contact';
import type { QuoteFormData } from '@/lib/schemas/quote';
import type { SourcingFormData } from '@/lib/schemas/sourcing';
import type { CallbackFormData } from '@/lib/schemas/callback';
import { ContactNotification } from './templates/contact-notification';
import { QuoteNotification } from './templates/quote-notification';
import { SourcingNotification } from './templates/sourcing-notification';
import { CallbackNotification } from './templates/callback-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

const TOKO_EMAIL = 'info@toko.com.tr';
const FROM_ADDRESS = 'Toko Website <noreply@toko.com.tr>';

type EmailType = 'contact' | 'quote' | 'sourcing' | 'callback';

type EmailDataMap = {
  contact: ContactFormData;
  quote: QuoteFormData;
  sourcing: SourcingFormData;
  callback: CallbackFormData;
};

function getSubject(type: EmailType, data: EmailDataMap[typeof type]): string {
  switch (type) {
    case 'contact':
      return `New Contact Form: ${(data as ContactFormData).subject}`;
    case 'quote':
      return `New Quote Request: ${(data as QuoteFormData).product}`;
    case 'sourcing':
      return `New Sourcing Request: ${(data as SourcingFormData).product}`;
    case 'callback':
      return `Callback Request: ${(data as CallbackFormData).subject}`;
  }
}

function getEmailTemplate(type: EmailType, data: EmailDataMap[typeof type]) {
  switch (type) {
    case 'contact':
      return ContactNotification(data as ContactFormData);
    case 'quote':
      return QuoteNotification(data as QuoteFormData);
    case 'sourcing':
      return SourcingNotification(data as SourcingFormData);
    case 'callback':
      return CallbackNotification(data as CallbackFormData);
  }
}

export async function sendNotificationEmail<T extends EmailType>(
  type: T,
  data: EmailDataMap[T]
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping email send');
    return;
  }

  const subject = getSubject(type, data);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [TOKO_EMAIL],
    subject,
    react: getEmailTemplate(type, data),
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }
}
