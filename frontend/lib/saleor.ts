import type { Product } from './types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Entrecôte de bœuf maturée',
    slug: 'entrecote-boeuf-maturee',
    description: 'Entrecôte de bœuf de première qualité, maturée 21 jours, viande tendre et savoureuse.',
    price: '29.90',
    category: 'Bœuf',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80',
    stock: 12,
    origin: 'France',
  },
  {
    id: 'prod-002',
    name: 'Côte de porc fermier',
    slug: 'cote-de-porc-fermier',
    description: 'Côte de porc fermier élevée en plein air, goût riche et naturel.',
    price: '14.50',
    category: 'Porc',
    image: 'https://images.unsplash.com/photo-1516684669134-de6d8c79e3a4?auto=format&fit=crop&w=1000&q=80',
    stock: 20,
    origin: 'France',
  },
  {
    id: 'prod-003',
    name: 'Magret de canard fumé',
    slug: 'magret-canard-fume',
    description: 'Magret de canard fumé, prêt à cuire, saveurs authentiques du Sud-Ouest.',
    price: '24.90',
    category: 'Volaille',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80',
    stock: 8,
    origin: 'France',
  },
];

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getAllProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((product) => product.slug === slug) ?? null;
}
