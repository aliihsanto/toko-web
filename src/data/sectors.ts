export interface SectorItem {
  slug: string;
  iconName: string;
  image: string;
  productKeys: string[];
}

export const sectors: SectorItem[] = [
  {
    slug: 'food',
    iconName: 'Wheat',
    image:
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
    productKeys: ['grains', 'dairyProducts', 'cannedGoods', 'spices'],
  },
  {
    slug: 'textile',
    iconName: 'Shirt',
    image:
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800',
    productKeys: ['fabrics', 'readyToWear', 'homeTextiles', 'industrialTextiles'],
  },
  {
    slug: 'machinery',
    iconName: 'Cog',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    productKeys: ['industrialMachinery', 'agriculturalEquipment', 'spareParts', 'automation'],
  },
  {
    slug: 'chemicals',
    iconName: 'FlaskConical',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
    productKeys: ['industrialChemicals', 'petrochemicals', 'pharmaceuticals', 'fertilizers'],
  },
  {
    slug: 'construction',
    iconName: 'Building2',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    productKeys: ['buildingMaterials', 'steel', 'cement', 'plumbing'],
  },
  {
    slug: 'raw-materials',
    iconName: 'Mountain',
    image:
      'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    productKeys: ['metals', 'minerals', 'timber', 'polymers'],
  },
  {
    slug: 'electronics',
    iconName: 'Cpu',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    productKeys: ['components', 'consumerElectronics', 'cables', 'lighting'],
  },
  {
    slug: 'automotive',
    iconName: 'Car',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    productKeys: ['autoParts', 'tires', 'accessories', 'commercialVehicles'],
  },
];

export function getSectorBySlug(slug: string): SectorItem | undefined {
  return sectors.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return sectors.map((s) => s.slug);
}
