import { z } from 'zod';

// Language-agnostic schema -- error messages come from i18n in the form component
export const callbackSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,20}$/),
  preferredTime: z.string().min(1).max(100),
  subject: z.string().min(3).max(200),
  // Honeypot field -- must be empty
  website: z.string().max(0).optional(),
});

export type CallbackFormData = z.infer<typeof callbackSchema>;
