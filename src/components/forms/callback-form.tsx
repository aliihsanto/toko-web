'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslations } from 'next-intl';
import { PhoneCall } from 'lucide-react';
import { callbackSchema, type CallbackFormData } from '@/lib/schemas/callback';
import { submitCallbackForm } from '@/lib/actions/callback';
import type { FormState } from '@/lib/actions/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/forms/submit-button';
import { FormSuccess } from '@/components/forms/form-success';
import { HoneypotField } from '@/components/forms/honeypot-field';

const initialState: FormState = { success: false, message: '' };

export function CallbackForm() {
  const t = useTranslations('Forms.callback');
  const tValidation = useTranslations('Forms.validation');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      name: '',
      phone: '',
      preferredTime: '',
      subject: '',
      website: '',
    },
  });

  const [state, formAction, pending] = useActionState(submitCallbackForm, initialState);

  function getFieldError(field: keyof CallbackFormData) {
    const error = errors[field];
    if (!error) return null;
    const code = error.type;
    if (code === 'too_small') return tValidation('tooShort');
    if (code === 'too_big') return tValidation('tooLong');
    if (code === 'invalid_string') {
      if (field === 'phone') return tValidation('invalidPhone');
      return tValidation('required');
    }
    return tValidation('required');
  }

  async function onSubmit(data: CallbackFormData) {
    const token = executeRecaptcha ? await executeRecaptcha('callback') : '';
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
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t('phonePlaceholder')}
            className="mt-1.5 h-11 rounded-xl"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{getFieldError('phone')}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="preferredTime">{t('preferredTime')}</Label>
        <Input
          id="preferredTime"
          placeholder={t('preferredTimePlaceholder')}
          className="mt-1.5 h-11 rounded-xl"
          aria-invalid={!!errors.preferredTime}
          {...register('preferredTime')}
        />
        {errors.preferredTime && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('preferredTime')}</p>
        )}
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

      <HoneypotField register={register('website')} />

      <SubmitButton pending={pending}>
        <PhoneCall className="mr-2 h-4 w-4" />
        {t('submit')}
      </SubmitButton>
    </form>
  );
}
