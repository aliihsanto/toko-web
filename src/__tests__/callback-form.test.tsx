import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CallbackForm } from '@/components/forms/callback-form';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Forms.callback': {
        title: 'Request a Callback',
        name: 'Full Name',
        phone: 'Phone Number',
        preferredTime: 'Preferred Time',
        subject: 'Subject',
        submit: 'Request Callback',
        namePlaceholder: 'John Doe',
        phonePlaceholder: '+90 555 000 00 00',
        preferredTimePlaceholder: 'e.g. Weekdays 10:00-17:00',
        subjectPlaceholder: 'What would you like to discuss?',
      },
      'Forms.validation': {
        required: 'This field is required.',
        tooShort: 'This field is too short.',
        invalidPhone: 'Please enter a valid phone number.',
      },
    };
    return translations[ns]?.[key] ?? `${ns}.${key}`;
  },
}));

// Mock react-google-recaptcha-v3
vi.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: vi.fn().mockResolvedValue('mock-token'),
  }),
}));

// Mock react useActionState
const mockFormAction = vi.fn();
let mockState = { success: false, message: '' };

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useActionState: () => [mockState, mockFormAction, false],
  };
});

// Mock server action
vi.mock('@/lib/actions/callback', () => ({
  submitCallbackForm: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('CallbackForm', () => {
  beforeEach(() => {
    mockState = { success: false, message: '' };
  });

  it('renders all visible fields (name, phone, preferredTime, subject)', () => {
    render(<CallbackForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Preferred Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
  });

  it('phone input has type="tel"', () => {
    render(<CallbackForm />);
    const phoneInput = screen.getByLabelText('Phone Number');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('renders submit button', () => {
    render(<CallbackForm />);
    expect(screen.getByRole('button', { name: /request callback/i })).toBeInTheDocument();
  });

  it('honeypot field has aria-hidden', () => {
    render(<CallbackForm />);
    const honeypotContainer = document.querySelector('[aria-hidden="true"]');
    expect(honeypotContainer).toBeInTheDocument();
  });
});
