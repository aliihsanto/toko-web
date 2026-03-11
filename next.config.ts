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

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tr',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
