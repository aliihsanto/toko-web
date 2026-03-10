import { z } from 'zod';

// Language-agnostic schema -- error messages come from i18n in the form component
export const sourcingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  product: z.string().min(3).max(300),
  specifications: z.string().min(10).max(5000),
  quantity: z.string().min(1).max(100),
  targetCountry: z.string().min(2).max(100),
  // Honeypot field -- must be empty
  website: z.string().max(0).optional(),
});

export type SourcingFormData = z.infer<typeof sourcingSchema>;
