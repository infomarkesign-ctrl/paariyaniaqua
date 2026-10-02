import { useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import CTABanner from '@/components/ui/CTABanner';
import { fetchProducts } from '@/lib/products';
import { heroImages } from '@/lib/site';
import type { Product, ProductCategory } from '@/types';
import { ArrowRight } from 'lucide-react';

const categories: {
  key: ProductCategory;
  title: string;
  desc: string;
  image: string;
  path: string;
}[] = [
  {
    key: 'meat',
    title: 'Meat Products',
    desc: 'Chicken, mutton, goat, buffalo, turkey, duck, and processed meats in bulk.',
    image: heroImages.meat,
    path: '/products/meat',
  },
  {
    key: 'fish',
    title: 'Fish & Seafood',
    desc: 'Fresh fish, prawns, crab, squid, and mixed seafood combos.',
    image: heroImages.fish,
    path: '/products/fish-seafood',
  },
  {
    key: 'eggs',
    title: 'Egg Products',
    desc: 'White eggs, brown eggs, bulk crates, and specialty eggs.',
    image: heroImages.eggs,
    path: '/products/eggs',
  },
];

export default function ProductsOverviewPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((products) => {
      setAllProducts(products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="Explore our complete range of wholesale meat, fish & seafood, and egg products — sourced fresh, processed hygienically, and supplied in bulk."
        breadcrumbs={[{ label: 'Our Products' }]}
        bgImage={heroImages.coldStorage}
      />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-navy-600">
              We offer a comprehensive catalog of over 40 products across three
              core categories. Every product is sourced from verified suppliers,
              hygienically processed, and delivered with the cold chain maintained.
              Whether you need a single product in bulk or a mixed order across
              categories, we have the capacity and reliability to meet your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                to={cat.path}
                className="card card-hover group relative block overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl font-bold text-white">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream-200">{cat.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-colors group-hover:text-teal-300">
                      View Products
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products from Each Category */}
      {categories.map((cat) => {
        const catProducts = allProducts
          .filter((p) => p.category === cat.key)
          .slice(0, 4);
        if (catProducts.length === 0 && !loading) return null;
        return (
          <section
            key={cat.key}
            className={`py-12 ${cat.key === 'meat' ? 'bg-cream-100' : ''}`}
          >
            <div className="container-wide">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  {cat.title}
                </h2>
                <Link
                  to={cat.path}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  View All →
                </Link>
              </div>
              {loading ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-100"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <CTABanner
        title="Need a Customized Bulk Order?"
        subtitle="Contact us for volume-based pricing and customized supply arrangements tailored to your business needs."
      />
    </>
  );
}
