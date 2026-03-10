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
    image:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=800',
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
    image:
      'https://images.unsplash.com/photo-1605732562742-aec009732a1b?auto=format&fit=crop&q=80&w=800',
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
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
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
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
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
