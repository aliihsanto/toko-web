import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue(
    new Map([['x-forwarded-for', '127.0.0.1']])
  ),
}));

// Mock sendNotificationEmail
const mockSendEmail = vi.fn().mockResolvedValue(undefined);
vi.mock('@/lib/email/resend', () => ({
  sendNotificationEmail: (...args: unknown[]) => mockSendEmail(...args),
}));

// Mock verifyRecaptcha
const mockVerifyRecaptcha = vi.fn().mockResolvedValue(true);
vi.mock('@/lib/recaptcha', () => ({
  verifyRecaptcha: (...args: unknown[]) => mockVerifyRecaptcha(...args),
}));

// Mock rateLimit
const mockRateLimit = vi.fn().mockReturnValue({ success: true });
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: (...args: unknown[]) => mockRateLimit(...args),
}));

import { submitContactForm } from '@/lib/actions/contact';
import type { FormState } from '@/lib/actions/types';

const initialState: FormState = { success: false, message: '' };

function createContactFormData(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  const defaults: Record<string, string> = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message with enough characters.',
    recaptchaToken: 'mock-recaptcha-token',
    ...overrides,
  };
  for (const [key, value] of Object.entries(defaults)) {
    data.set(key, value);
  }
  return data;
}

describe('submitContactForm server action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendEmail.mockResolvedValue(undefined);
    mockVerifyRecaptcha.mockResolvedValue(true);
    mockRateLimit.mockReturnValue({ success: true });
  });

  it('sends email on valid submission', async () => {
    const formData = createContactFormData();
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(true);
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(
      'contact',
      expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      })
    );
  });

  it('returns validation errors for invalid data', async () => {
    const formData = createContactFormData({ name: '' });
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveProperty('name');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('blocks when rate limited', async () => {
    mockRateLimit.mockReturnValue({ success: false });

    const formData = createContactFormData();
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('rateLimited');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('silently succeeds on honeypot trigger (does not send email)', async () => {
    const formData = createContactFormData({ website: 'spam-url.com' });
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(true);
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('rejects when reCAPTCHA verification fails', async () => {
    mockVerifyRecaptcha.mockResolvedValue(false);

    const formData = createContactFormData();
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('recaptchaFailed');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('catches email send failure and returns error', async () => {
    mockSendEmail.mockRejectedValue(new Error('Resend API error'));

    const formData = createContactFormData();
    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('sendFailed');
  });
});
