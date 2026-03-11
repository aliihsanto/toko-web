export const COMPANY_INFO = {
  name: 'Toko Trading',
  url: 'https://toko.com.tr',
  phone: '+90 212 450 60 20',
  email: 'info@toko.com.tr',
  address: {
    street: 'Ziya Gökalp Mah. Süleyman Demirel Blv. The Office No: 7 E İç Kapı No: 165',
    city: 'Başakşehir',
    region: 'İstanbul',
    country: 'TR',
    postalCode: '34480',
  },
  geo: {
    latitude: 41.0639238,
    longitude: 28.8054737,
  },
  social: [] as string[],
  availableLanguages: ['Turkish', 'English', 'French', 'Russian'],
  openingHours: 'Mo-Fr 09:00-18:00',
} as const;
