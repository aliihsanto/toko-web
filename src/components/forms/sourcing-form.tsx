'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { sourcingSchema, type SourcingFormData } from '@/lib/schemas/sourcing';
import { submitSourcingForm } from '@/lib/actions/sourcing';
import type { FormState } from '@/lib/actions/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/forms/submit-button';
import { FormSuccess } from '@/components/forms/form-success';
import { HoneypotField } from '@/components/forms/honeypot-field';

const initialState: FormState = { success: false, message: '' };

export function SourcingForm() {
  const t = useTranslations('Forms.sourcing');
  const tValidation = useTranslations('Forms.validation');
  const tOptional = useTranslations('Forms');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SourcingFormData>({
    resolver: zodResolver(sourcingSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      product: '',
      specifications: '',
      quantity: '',
      targetCountry: '',
      website: '',
    },
  });

  const [state, formAction, pending] = useActionState(submitSourcingForm, initialState);

  function getFieldError(field: keyof SourcingFormData) {
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

  async function onSubmit(data: SourcingFormData) {
    const token = executeRecaptcha ? await executeRecaptcha('sourcing') : '';
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
        <Label htmlFor="company">
          {t('company')} <span className="text-muted-foreground font-normal">({tOptional('optional')})</span>
        </Label>
        <Input
          id="company"
          placeholder={t('companyPlaceholder')}
          className="mt-1.5 h-11 rounded-xl"
          {...register('company')}
        />
      </div>

      <div>
        <Label htmlFor="product">{t('product')}</Label>
        <Input
          id="product"
          placeholder={t('productPlaceholder')}
          className="mt-1.5 h-11 rounded-xl"
          aria-invalid={!!errors.product}
          {...register('product')}
        />
        {errors.product && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('product')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="specifications">{t('specifications')}</Label>
        <Textarea
          id="specifications"
          placeholder={t('specificationsPlaceholder')}
          className="mt-1.5 min-h-[120px] rounded-xl"
          aria-invalid={!!errors.specifications}
          {...register('specifications')}
        />
        {errors.specifications && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('specifications')}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="quantity">{t('quantity')}</Label>
          <Input
            id="quantity"
            placeholder={t('quantityPlaceholder')}
            className="mt-1.5 h-11 rounded-xl"
            aria-invalid={!!errors.quantity}
            {...register('quantity')}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-destructive">{getFieldError('quantity')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="targetCountry">{t('targetCountry')}</Label>
          <Input
            id="targetCountry"
            placeholder={t('targetCountryPlaceholder')}
            className="mt-1.5 h-11 rounded-xl"
            aria-invalid={!!errors.targetCountry}
            {...register('targetCountry')}
          />
          {errors.targetCountry && (
            <p className="mt-1 text-sm text-destructive">{getFieldError('targetCountry')}</p>
          )}
        </div>
      </div>

      <HoneypotField register={register('website')} />

      <SubmitButton pending={pending}>
        <Send className="mr-2 h-4 w-4" />
        {t('submit')}
      </SubmitButton>
    </form>
  );
}
