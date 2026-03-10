import { DM_Sans, DM_Serif_Display } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-serif',
  display: 'swap',
});
