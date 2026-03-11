import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Toko Trading';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LOCALE_SUBTITLE: Record<string, string> = {
  tr: 'Uluslararası Ticaret & Tedarik',
  en: 'International Trade & Sourcing',
  fr: 'Commerce International & Approvisionnement',
  ru: 'Международная Торговля и Снабжение',
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const description = t('description');
  const subtitle = LOCALE_SUBTITLE[locale] || LOCALE_SUBTITLE.tr;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d7377 0%, #1a5c5e 40%, #1a1a2e 100%)',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(212, 97, 60, 0.25)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '200px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(232, 168, 64, 0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '120px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(45, 138, 110, 0.2)',
            display: 'flex',
          }}
        />

        {/* Logo mark + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: '#fefcf9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#0d7377',
            }}
          >
            T
          </div>
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(254, 252, 249, 0.6)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            toko.com.tr
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 'bold',
            color: '#fefcf9',
            lineHeight: 1.1,
            marginBottom: '12px',
            display: 'flex',
          }}
        >
          Toko Trading
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '30px',
            color: '#e8a840',
            marginBottom: '24px',
            fontWeight: 600,
            display: 'flex',
          }}
        >
          {subtitle}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(254, 252, 249, 0.7)',
            lineHeight: 1.5,
            maxWidth: '800px',
            display: 'flex',
          }}
        >
          {description}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'linear-gradient(to right, #0d7377, #d4613c, #e8a840)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
