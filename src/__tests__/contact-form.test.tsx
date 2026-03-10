import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactForm } from '@/components/forms/contact-form';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Forms.contact': {
        title: 'Send Us a Message',
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@example.com',
        subjectPlaceholder: 'How can we help?',
        messagePlaceholder: 'Tell us about your requirements...',
      },
      'Forms.validation': {
        required: 'This field is required.',
        tooShort: 'This field is too short.',
        invalidEmail: 'Please enter a valid email address.',
      },
      Forms: {
        optional: 'optional',
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
vi.mock('@/lib/actions/contact', () => ({
  submitContactForm: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    mockState = { success: false, message: '' };
  });

  it('renders all 4 visible fields (name, email, subject, message)', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('does NOT show honeypot field visually (has aria-hidden)', () => {
    render(<ContactForm />);
    const honeypotContainer = document.querySelector('[aria-hidden="true"]');
    expect(honeypotContainer).toBeInTheDocument();
  });

  it('shows success message when state.success is true', () => {
    mockState = { success: true, message: 'Your message has been sent!' };
    render(<ContactForm />);
    expect(screen.getByText('Your message has been sent!')).toBeInTheDocument();
  });
});
