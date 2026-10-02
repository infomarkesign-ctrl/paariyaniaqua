import { useState, useEffect, useMemo } from 'react';
import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import CTABanner from '@/components/ui/CTABanner';
import { fetchProducts, categoryFromSlug, categoryLabels } from '@/lib/products';
import { heroImages } from '@/lib/site';
import type { Product, ProductCategory } from '@/types';
import { Filter, Package, ArrowRight, Info } from 'lucide-react';

export default function CategoryListingPage({ slug }: { slug: string }) {
  const category = categoryFromSlug(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    fetchProducts(category).then((prods) => {
      setProducts(prods);
      setLoading(false);
    });
  }, [category]);

  const subTypes = useMemo(() => {
    const types = new Set(products.map((p) => p.sub_type));
    return Array.from(types).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedType !== 'all') {
      result = result.filter((p) => p.sub_type === selectedType);
    }
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [products, selectedType, sortBy]);

  if (!category) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Category Not Found
        </h1>
        <Link to="/products" className="mt-4 inline-block btn-outline">
          Back to Products
        </Link>
      </div>
    );
  }

  const bgImage =
    category === 'meat'
      ? heroImages.meat
      : category === 'fish'
        ? heroImages.fish
        : heroImages.eggs;

  const filterLabel =
    category === 'meat'
      ? 'Type'
      : category === 'fish'
        ? 'Seafood Type'
        : 'Egg Type';

  return (
    <>
      <PageHeader
        title={categoryLabels[category]}
        subtitle={`Browse our full range of ${categoryLabels[category].toLowerCase()} available for bulk wholesale supply. All products are hygienically processed and delivered with cold chain maintained.`}
        breadcrumbs={[
          { label: 'Our Products', path: '/products' },
          { label: categoryLabels[category] },
        ]}
        bgImage={bgImage}
      />

      {/* Bulk order banner */}
      <div className="border-b border-cream-200 bg-teal-50">
        <div className="container-wide flex items-center gap-3 py-3 text-sm text-teal-800">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>
            All products are available in bulk quantities. Contact us for
            volume-based pricing and regular supply contracts.
          </span>
        </div>
      </div>

      {/* Products */}
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {/* Filter bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-navy-500" />
              <span className="text-sm font-medium text-navy-700">
                {filterLabel}:
              </span>
              <button
                onClick={() => setSelectedType('all')}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-navy-900 text-white'
                    : 'bg-cream-100 text-navy-700 hover:bg-cream-200'
                }`}
              >
                All
              </button>
              {subTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-navy-900 text-white'
                      : 'bg-cream-100 text-navy-700 hover:bg-cream-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-navy-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm text-navy-900 focus:border-teal-500 focus:outline-none"
              >
                <option value="default">Featured</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-navy-500">
            {loading
              ? 'Loading products...'
              : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} available`}
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-100"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-cream-100 py-16 text-center">
              <Package className="mx-auto h-12 w-12 text-navy-300" />
              <p className="mt-4 text-navy-600">
                No products found in this filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-category links */}
      <section className="bg-cream-100 py-12">
        <div className="container-wide">
          <h3 className="text-center font-display text-lg font-semibold text-navy-900">
            Explore Other Categories
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {(['meat', 'fish', 'eggs'] as ProductCategory[])
              .filter((c) => c !== category)
              .map((c) => {
                const slug =
                  c === 'meat'
                    ? 'meat'
                    : c === 'fish'
                      ? 'fish-seafood'
                      : 'eggs';
                return (
                  <Link
                    key={c}
                    to={`/products/${slug}`}
                    className="btn-outline"
                  >
                    {categoryLabels[c]}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
