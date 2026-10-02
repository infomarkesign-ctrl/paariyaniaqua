import { useState } from 'react';
import { Link } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import { getProductQuantityLimit } from '@/lib/productLimits';
import { getUnitPrice, formatINR } from '@/lib/pricing';
import { siteConfig } from '@/lib/site';
import type { Product } from '@/types';
import { ShoppingCart, MessageCircle, Minus, Plus } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, updateQuantity, removeFromCart, items, getItemIndex } = useCart();
  const [added, setAdded] = useState(false);

  const unitPrice = getUnitPrice(product, product.packaging_options[0]);
  const limit = getProductQuantityLimit(product.id);
  const existingIndex = getItemIndex(product.id, product.packaging_options[0]);
  const existingQty = existingIndex >= 0 ? items[existingIndex].quantity : 0;
  const atLimit = existingQty >= limit;
  const limitTitle = atLimit
    ? `Max ${limit} reached. Email ${siteConfig.contact.email} to order more.`
    : undefined;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (atLimit) return;
    addToCart(product, product.packaging_options[0], 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (atLimit) return;
    updateQuantity(existingIndex, existingQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (existingQty <= 1) {
      removeFromCart(existingIndex);
    } else {
      updateQuantity(existingIndex, existingQty - 1);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-navy-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {product.sub_type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold text-navy-900 transition-colors group-hover:text-teal-600">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-navy-600">
          {product.short_description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-navy-500">
          <span className="rounded-md bg-cream-100 px-2 py-0.5">
            {product.packaging_options[0]}
          </span>
          <span>{product.unit_label}</span>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-xs font-medium text-coral-600">
            {formatINR(unitPrice)}{' '}
            <span className="font-normal text-navy-400">/ {product.packaging_options[0]}</span>
          </p>
          {existingQty > 0 && (
            <p className="mt-0.5 text-[11px] text-navy-500">
              Total ({existingQty}): {formatINR(unitPrice * existingQty)}
            </p>
          )}
          <div className="mt-2.5 flex items-center gap-2">
            {existingQty > 0 ? (
              <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-teal-500 bg-teal-50">
                <button
                  onClick={handleDecrement}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-teal-700 hover:bg-teal-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-semibold text-teal-800">
                  {existingQty}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={atLimit}
                  title={limitTitle}
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center ${
                    atLimit
                      ? 'cursor-not-allowed text-teal-300'
                      : 'text-teal-700 hover:bg-teal-100'
                  }`}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  added
                    ? 'bg-teal-500 text-white'
                    : 'bg-navy-800 text-white hover:bg-navy-900'
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            )}
            <span className="flex items-center justify-center rounded-lg border border-cream-300 px-3 py-2 text-xs font-medium text-navy-700 transition-colors hover:border-teal-500 hover:text-teal-600">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
          </div>
          {existingQty > 0 && atLimit && (
            <p className="mt-1.5 text-[11px] font-medium text-coral-600">
              Max {limit} reached. Email{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                onClick={(e) => e.stopPropagation()}
                className="underline hover:text-coral-700"
              >
                {siteConfig.contact.email}
              </a>{' '}
              for more.
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
