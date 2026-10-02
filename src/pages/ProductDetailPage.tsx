import { useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import { useRouter } from '@/lib/router';
import { useCart } from '@/context/CartContext';

import ProductCard from '@/components/ui/ProductCard';
import EnquiryForm from '@/components/ui/EnquiryForm';
import CTABanner from '@/components/ui/CTABanner';
import { fetchProductById, fetchRelatedProducts, categoryLabels } from '@/lib/products';
import { getProductQuantityLimit } from '@/lib/productLimits';
import { getUnitPrice, formatINR } from '@/lib/pricing';
import { siteConfig } from '@/lib/site';
import type { Product } from '@/types';
import {
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  Check,
  Snowflake,
  ShieldCheck,
  Truck,
  Banknote,
  ChevronRight,
} from 'lucide-react';

export default function ProductDetailPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const { addToCart, items, getItemIndex } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [limitNotice, setLimitNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'storage' | 'delivery'>('description');
  const [added, setAdded] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchProductById(id).then((p) => {
      if (!p) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setProduct(p);
      setSelectedPackaging(p.packaging_options[0]);
      setQuantity(1);
      setLimitNotice(false);
      setLoading(false);
      fetchRelatedProducts(p.category, p.id, 4).then(setRelated);
    });
  }, [id]);

  const exceedsCartLimit = () => {
    if (!product) return true;
    const limit = getProductQuantityLimit(product.id);
    const existingIndex = getItemIndex(product.id, selectedPackaging);
    const existingQty = existingIndex >= 0 ? items[existingIndex].quantity : 0;
    if (quantity > Math.max(0, limit - existingQty)) {
      setLimitNotice(true);
      return true;
    }
    return false;
  };

  const handleAddToCart = () => {
    if (!product || exceedsCartLimit()) return;
    addToCart(product, selectedPackaging, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product || exceedsCartLimit()) return;
    addToCart(product, selectedPackaging, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="container-x py-24">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-64 rounded bg-cream-100" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-cream-100" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-cream-100" />
              <div className="h-4 w-full rounded bg-cream-100" />
              <div className="h-4 w-2/3 rounded bg-cream-100" />
              <div className="h-12 w-full rounded bg-cream-100" />
              <div className="h-12 w-full rounded bg-cream-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Product Not Found
        </h1>
        <p className="mt-3 text-navy-600">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/products" className="mt-6 inline-block btn-outline">
          Browse All Products
        </Link>
      </div>
    );
  }

  const maxQty = getProductQuantityLimit(product.id);
  const cartIndex = getItemIndex(product.id, selectedPackaging);
  const cartQty = cartIndex >= 0 ? items[cartIndex].quantity : 0;
  const remainingQty = Math.max(0, maxQty - cartQty);
  const soldOut = remainingQty <= 0;
  const unitPrice = getUnitPrice(product, selectedPackaging);
  const totalPrice = unitPrice * quantity;

  const categorySlug =
    product.category === 'meat'
      ? 'meat'
      : product.category === 'fish'
        ? 'fish-seafood'
        : 'eggs';

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-cream-200 bg-white">
        <div className="container-wide flex items-center gap-1.5 py-3 text-xs text-navy-500">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-teal-600">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/products/${categorySlug}`} className="hover:text-teal-600">
            {categoryLabels[product.category]}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-navy-900">{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-10 lg:py-16">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div>
            <div className="relative overflow-hidden rounded-2xl bg-cream-100 shadow-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-md bg-navy-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                {product.sub_type}
              </span>
            </div>
            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white p-3">
                <Snowflake className="h-5 w-5 text-teal-600" />
                <span className="text-xs font-medium text-navy-700">Cold Chain Maintained</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white p-3">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <span className="text-xs font-medium text-navy-700">Hygienically Processed</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white p-3">
                <Truck className="h-5 w-5 text-teal-600" />
                <span className="text-xs font-medium text-navy-700">Bulk Delivery Available</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white p-3">
                <Banknote className="h-5 w-5 text-teal-600" />
                <span className="text-xs font-medium text-navy-700">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="section-label">{categoryLabels[product.category]}</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-navy-600">
              {product.short_description}
            </p>

            <div className="mt-5 rounded-xl bg-cream-100 p-4">
              <p className="text-sm font-semibold text-coral-600">
                {formatINR(unitPrice)}{' '}
                <span className="font-normal text-navy-500">/ {selectedPackaging}</span>
              </p>
              <p className="mt-1 text-xs text-navy-500">
                Total for {quantity} × {selectedPackaging}:{' '}
                <span className="font-semibold text-navy-700">{formatINR(totalPrice)}</span>
              </p>
            </div>

            {/* Packaging selector */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-navy-700">
                Packaging / Unit
              </label>
              <div className="flex flex-wrap gap-2">
                {product.packaging_options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedPackaging(opt);
                      setQuantity(1);
                      setLimitNotice(false);
                    }}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                      selectedPackaging === opt
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-cream-300 bg-white text-navy-700 hover:border-cream-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-navy-700">
                Quantity (max {maxQty} per online order)
              </label>
              {soldOut ? (
                <div className="rounded-lg border-2 border-coral-200 bg-coral-50 px-4 py-3">
                  <p className="text-sm font-semibold text-coral-700">
                    Out of Stock Online — {selectedPackaging}
                  </p>
                  <p className="mt-1 text-xs text-coral-600">
                    You already have the maximum of {maxQty} in your cart for this
                    packaging. To order more, please email{' '}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="underline hover:text-coral-800"
                    >
                      {siteConfig.contact.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border-2 border-cream-300 bg-white">
                      <button
                        onClick={() => {
                          setLimitNotice(false);
                          setQuantity((q) => Math.max(1, q - 1));
                        }}
                        className="flex h-11 w-11 items-center justify-center text-navy-700 hover:bg-cream-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const val = Math.max(1, parseInt(e.target.value) || 1);
                          if (val > remainingQty) {
                            setQuantity(remainingQty);
                            setLimitNotice(true);
                          } else {
                            setQuantity(val);
                            setLimitNotice(false);
                          }
                        }}
                        className="h-11 w-16 border-x border-cream-200 text-center text-sm font-semibold text-navy-900 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          setQuantity((q) => {
                            if (q >= remainingQty) {
                              setLimitNotice(true);
                              return q;
                            }
                            setLimitNotice(false);
                            return q + 1;
                          });
                        }}
                        className="flex h-11 w-11 items-center justify-center text-navy-700 hover:bg-cream-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-xs text-navy-500">
                      {remainingQty} more available online for this packaging
                    </span>
                  </div>
                  {limitNotice && (
                    <p className="mt-2 text-xs font-medium text-coral-600">
                      You can add up to {remainingQty} more of this packaging online
                      (max {maxQty} total). To order a larger quantity, please email{' '}
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="underline hover:text-coral-700"
                      >
                        {siteConfig.contact.email}
                      </a>
                      .
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={soldOut}
                className={`btn-secondary flex-1 disabled:cursor-not-allowed disabled:opacity-50 ${added ? 'bg-teal-500' : ''}`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    {soldOut ? 'Max Reached' : 'Add to Cart'}
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={soldOut}
                className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Banknote className="h-4 w-4" />
                Buy Now (COD)
              </button>
              <button
                onClick={() => setShowEnquiry((p) => !p)}
                className="btn-outline"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire Now
              </button>
            </div>

            {/* Inline enquiry */}
            {showEnquiry && (
              <div className="mt-6 rounded-2xl border border-cream-200 bg-cream-50 p-5">
                <h3 className="font-display text-base font-semibold text-navy-900">
                  Enquire about {product.name}
                </h3>
                <div className="mt-4">
                  <EnquiryForm
                    productId={product.id}
                    productName={product.name}
                    compact
                  />
                </div>
              </div>
            )}

            {/* Quick info */}
            <div className="mt-6 space-y-2 border-t border-cream-200 pt-5">
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Check className="h-4 w-4 text-teal-600" />
                Sourced from verified suppliers
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Check className="h-4 w-4 text-teal-600" />
                Hygienically processed and quality checked
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Check className="h-4 w-4 text-teal-600" />
                Delivered with cold chain maintained
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Check className="h-4 w-4 text-teal-600" />
                Payment: Cash on Delivery only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-cream-100 py-12 lg:py-16">
        <div className="container-wide">
          <div className="flex flex-wrap gap-1 border-b border-cream-300">
            {[
              { key: 'description' as const, label: 'Description' },
              { key: 'storage' as const, label: 'Freshness & Storage' },
              { key: 'delivery' as const, label: 'Delivery Info' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-t-lg px-5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-teal-500 bg-white text-navy-900'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-b-2xl bg-white p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose-legal max-w-3xl">
                <p>{product.long_description}</p>
                <h3>Packaging Options</h3>
                <ul>
                  {product.packaging_options.map((opt) => (
                    <li key={opt}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'storage' && (
              <div className="max-w-3xl space-y-3 text-navy-700">
                <p>
                  This product is stored and transported under strict temperature
                  control to preserve freshness. Our cold chain process ensures
                  that the product reaches you in optimal condition.
                </p>
                <p>
                  <strong>Storage guidelines:</strong> Upon delivery, immediately
                  transfer to refrigerated or frozen storage as appropriate for
                  the product type. Maintain recommended storage temperatures
                  until use.
                </p>
                <p>
                  <strong>Hygiene:</strong> All products are processed in sanitized
                  facilities following food safety protocols. Handlers use
                  protective gear including gloves and hairnets.
                </p>
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="max-w-3xl space-y-3 text-navy-700">
                <p>
                  <strong>Delivery areas:</strong> We supply across Mumbai and
                  surrounding regions in Maharashtra. Contact us for delivery
                  area confirmation.
                </p>
                <p>
                  <strong>Delivery timelines:</strong> Bulk orders are typically
                  delivered within 24-48 hours of confirmation, subject to
                  product availability and order volume.
                </p>
                <p>
                  <strong>Payment:</strong> Cash on Delivery (COD) only. No
                  advance payment required. No UPI, cards, net banking, or
                  wallets accepted.
                </p>
                <p>
                  <strong>Packaging:</strong> Products are packed in hygienic,
                  temperature-appropriate packaging to maintain cold chain
                  integrity during transport.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="container-wide">
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Related Products
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
