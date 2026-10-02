import { useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import { useRouter } from '@/lib/router';
import ProductCard from '@/components/ui/ProductCard';
import { searchProducts } from '@/lib/products';
import type { Product } from '@/types';
import { Search, ArrowRight } from 'lucide-react';

export default function SearchPage({ query }: { query: string }) {
  const { navigate } = useRouter();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
    setLoading(true);
    searchProducts(query).then((products) => {
      setResults(products);
      setLoading(false);
    });
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <>
      <div className="border-b border-cream-200 bg-navy-900 py-12 lg:py-16">
        <div className="container-wide">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Search Products
          </h1>
          <form onSubmit={handleSearch} className="mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded-xl border border-navy-700 bg-navy-800 py-3.5 pl-12 pr-4 text-white placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-100" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl bg-cream-100 py-16 text-center">
              <Search className="mx-auto h-12 w-12 text-navy-300" />
              <h2 className="mt-4 font-display text-xl font-semibold text-navy-900">
                No products found for "{query}"
              </h2>
              <p className="mt-2 text-navy-600">
                Try a different search term or browse our product categories.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/products/meat" className="btn-outline">Meat Products</Link>
                <Link to="/products/fish-seafood" className="btn-outline">Fish & Seafood</Link>
                <Link to="/products/eggs" className="btn-outline">Egg Products</Link>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-navy-500">
                {results.length} product{results.length !== 1 ? 's' : ''} found for "{query}"
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          <div className="mt-12 text-center">
            <Link to="/products" className="btn-primary">
              Browse All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
