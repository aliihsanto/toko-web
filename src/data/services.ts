export interface ServiceItem {
  slug: string;
  iconName: string;
  image: string;
  featureKeys: string[];
  color: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'import',
    iconName: 'Ship',
    image: '/images/services/import.webp',
    featureKeys: [
      'customs',
      'logistics',
      'costOptimization',
      'qualityControl',
      'documentation',
    ],
    color: 'blue',
  },
  {
    slug: 'export',
    iconName: 'TrendingUp',
    image: '/images/services/export.webp',
    featureKeys: [
      'marketResearch',
      'buyerMatching',
      'documentation',
      'compliance',
      'logistics',
    ],
    color: 'emerald',
  },
  {
    slug: 'sourcing',
    iconName: 'PackageCheck',
    image: '/images/services/sourcing.webp',
    featureKeys: [
      'supplierAudit',
      'qualityControl',
      'priceNegotiation',
      'sampleManagement',
      'supplyChain',
    ],
    color: 'amber',
  },
  {
    slug: 'transit-trade',
    iconName: 'BarChart3',
    image: '/images/services/transit-trade.webp',
    featureKeys: [
      'transitRoutes',
      'cisExpertise',
      'compliance',
      'customs',
      'warehousing',
    ],
    color: 'rose',
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
