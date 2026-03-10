export const COMPANY_INFO = {
  name: 'Toko Trading',
  url: 'https://toko.com.tr',
  phone: '+90-XXX-XXX-XXXX',
  email: 'info@toko.com.tr',
  address: {
    street: 'TBD',
    city: 'Istanbul',
    region: 'Istanbul',
    country: 'TR',
    postalCode: 'TBD',
  },
  geo: {
    latitude: 41.0082,
    longitude: 28.9784,
  },
  social: [] as string[],
  availableLanguages: ['Turkish', 'English', 'French', 'Russian'],
  openingHours: 'Mo-Fr 09:00-18:00',
} as const;
