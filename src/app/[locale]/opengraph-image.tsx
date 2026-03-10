import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Toko Trading';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const description = t('description');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0d7377 0%, #0a5c5f 50%, #0d7377 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative coral circle at bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(212, 97, 60, 0.10)',
          }}
        />

        {/* Top-left: brand name */}
        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '4px',
          }}
        >
          TOKO TRADING
        </div>

        {/* Center: page description */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: '900px',
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          toko.com.tr
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
