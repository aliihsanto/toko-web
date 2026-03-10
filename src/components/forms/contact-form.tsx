'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { submitContactForm } from '@/lib/actions/contact';
import type { FormState } from '@/lib/actions/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/forms/submit-button';
import { FormSuccess } from '@/components/forms/form-success';
import { HoneypotField } from '@/components/forms/honeypot-field';

const initialState: FormState = { success: false, message: '' };

export function ContactForm() {
  const t = useTranslations('Forms.contact');
  const tValidation = useTranslations('Forms.validation');
  const tErrors = useTranslations('Forms');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    },
  });

  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  function getFieldError(field: keyof ContactFormData) {
    const error = errors[field];
    if (!error) return null;
    const code = error.type;
    if (code === 'too_small') return tValidation('tooShort');
    if (code === 'too_big') return tValidation('tooLong');
    if (code === 'invalid_string') {
      if (field === 'email') return tValidation('invalidEmail');
      return tValidation('required');
    }
    return tValidation('required');
  }

  async function onSubmit(data: ContactFormData) {
    const token = executeRecaptcha ? await executeRecaptcha('contact') : '';
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value);
    });
    formData.append('recaptchaToken', token);
    formAction(formData);
  }

  if (state.success) {
    return <FormSuccess message={state.message} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {state.message && !state.success && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            placeholder={t('namePlaceholder')}
            className="mt-1.5 h-11 rounded-xl"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{getFieldError('name')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            className="mt-1.5 h-11 rounded-xl"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{getFieldError('email')}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">{t('subject')}</Label>
        <Input
          id="subject"
          placeholder={t('subjectPlaceholder')}
          className="mt-1.5 h-11 rounded-xl"
          aria-invalid={!!errors.subject}
          {...register('subject')}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('subject')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          placeholder={t('messagePlaceholder')}
          className="mt-1.5 min-h-[120px] rounded-xl"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('message')}</p>
        )}
      </div>

      <HoneypotField register={register('website')} />

      <SubmitButton pending={pending}>
        <Send className="mr-2 h-4 w-4" />
        {t('submit')}
      </SubmitButton>
    </form>
  );
}
