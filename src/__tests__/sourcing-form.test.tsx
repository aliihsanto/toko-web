import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SourcingForm } from '@/components/forms/sourcing-form';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Forms.sourcing': {
        title: 'Submit Sourcing Request',
        name: 'Full Name',
        email: 'Email Address',
        company: 'Company Name',
        product: 'Product / Material',
        specifications: 'Specifications',
        quantity: 'Quantity',
        targetCountry: 'Target Country',
        submit: 'Submit Request',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@company.com',
        companyPlaceholder: 'Your company name',
        productPlaceholder: 'e.g. Organic cotton',
        specificationsPlaceholder: 'Describe quality standards...',
        quantityPlaceholder: 'e.g. 200 tons',
        targetCountryPlaceholder: 'e.g. Turkey',
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
vi.mock('@/lib/actions/sourcing', () => ({
  submitSourcingForm: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('SourcingForm', () => {
  beforeEach(() => {
    mockState = { success: false, message: '' };
  });

  it('renders all visible fields (name, email, company, product, specifications, quantity, targetCountry)', () => {
    render(<SourcingForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/specifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target country/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<SourcingForm />);
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
  });

  it('honeypot field has aria-hidden', () => {
    render(<SourcingForm />);
    const honeypotContainer = document.querySelector('[aria-hidden="true"]');
    expect(honeypotContainer).toBeInTheDocument();
  });
});
