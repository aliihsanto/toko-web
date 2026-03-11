import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Velite integration -- trigger build on dev/build
// CRITICAL: Use NODE_ENV detection (not process.argv) for Next.js 16 Turbopack compatibility
const isDev = process.env.NODE_ENV === 'development';
const isBuild = process.argv.includes('build');

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
