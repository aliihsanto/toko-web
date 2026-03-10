import { z } from 'zod';

// Language-agnostic schema -- error messages come from i18n in the form component
export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  // Honeypot field -- must be empty
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
