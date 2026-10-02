import { products } from './productsData';
import type { Product, ProductCategory } from '@/types';

export async function fetchProducts(category?: ProductCategory): Promise<Product[]> {
  const result = category ? products.filter((p) => p.category === category) : products;
  return [...result].sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) || null;
}

export async function fetchFeaturedProducts(limit = 12): Promise<Product[]> {
  return products
    .filter((p) => p.is_featured)
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, limit);
}

export async function fetchRelatedProducts(
  category: ProductCategory,
  excludeId: string,
  limit = 4,
): Promise<Product[]> {
  return products
    .filter((p) => p.category === category && p.id !== excludeId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        p.sub_type.toLowerCase().includes(q),
    )
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 20);
}

export const categoryLabels: Record<ProductCategory, string> = {
  meat: 'Meat Products',
  fish: 'Fish & Seafood',
  eggs: 'Egg Products',
};

export const categorySlugs: Record<ProductCategory, string> = {
  meat: 'meat',
  fish: 'fish-seafood',
  eggs: 'eggs',
};

export function categoryFromSlug(slug: string): ProductCategory | null {
  if (slug === 'meat') return 'meat';
  if (slug === 'fish-seafood') return 'fish';
  if (slug === 'eggs') return 'eggs';
  return null;
}
