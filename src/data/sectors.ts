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
    image: '/images/sectors/food.jpg',
    productKeys: ['grains', 'dairyProducts', 'cannedGoods', 'spices'],
  },
  {
    slug: 'textile',
    iconName: 'Shirt',
    image: '/images/sectors/textile.jpg',
    productKeys: ['fabrics', 'readyToWear', 'homeTextiles', 'industrialTextiles'],
  },
  {
    slug: 'machinery',
    iconName: 'Cog',
    image: '/images/sectors/machinery.jpg',
    productKeys: ['industrialMachinery', 'agriculturalEquipment', 'spareParts', 'automation'],
  },
  {
    slug: 'chemicals',
    iconName: 'FlaskConical',
    image: '/images/sectors/chemicals.jpg',
    productKeys: ['industrialChemicals', 'petrochemicals', 'pharmaceuticals', 'fertilizers'],
  },
  {
    slug: 'construction',
    iconName: 'Building2',
    image: '/images/sectors/construction.jpg',
    productKeys: ['buildingMaterials', 'steel', 'cement', 'plumbing'],
  },
  {
    slug: 'raw-materials',
    iconName: 'Mountain',
    image: '/images/sectors/raw-materials.jpg',
    productKeys: ['metals', 'minerals', 'timber', 'polymers'],
  },
  {
    slug: 'electronics',
    iconName: 'Cpu',
    image: '/images/sectors/electronics.jpg',
    productKeys: ['components', 'consumerElectronics', 'cables', 'lighting'],
  },
  {
    slug: 'automotive',
    iconName: 'Car',
    image: '/images/sectors/automotive.jpg',
    productKeys: ['autoParts', 'tires', 'accessories', 'commercialVehicles'],
  },
];

export function getSectorBySlug(slug: string): SectorItem | undefined {
  return sectors.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return sectors.map((s) => s.slug);
}
