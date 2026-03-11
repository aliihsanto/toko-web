import { dmSans, dmSerif } from '@/lib/fonts';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
