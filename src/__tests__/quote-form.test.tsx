import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuoteForm } from '@/components/forms/quote-form';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Forms.quote': {
        title: 'Request a Quote',
        name: 'Full Name',
        email: 'Email Address',
        company: 'Company Name',
        product: 'Product / Material',
        quantity: 'Quantity',
        destinationCountry: 'Destination Country',
        details: 'Additional Details',
        submit: 'Request Quote',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@company.com',
        companyPlaceholder: 'Your company name',
        productPlaceholder: 'e.g. Steel pipes',
        quantityPlaceholder: 'e.g. 500 tons',
        destinationCountryPlaceholder: 'e.g. Germany',
        detailsPlaceholder: 'Specifications...',
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
vi.mock('@/lib/actions/quote', () => ({
  submitQuoteForm: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('QuoteForm', () => {
  beforeEach(() => {
    mockState = { success: false, message: '' };
  });

  it('renders all visible fields (name, email, company, product, quantity, destinationCountry, details)', () => {
    render(<QuoteForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/additional details/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<QuoteForm />);
    expect(screen.getByRole('button', { name: /request quote/i })).toBeInTheDocument();
  });

  it('honeypot field has aria-hidden', () => {
    render(<QuoteForm />);
    const honeypotContainer = document.querySelector('[aria-hidden="true"]');
    expect(honeypotContainer).toBeInTheDocument();
  });
});
