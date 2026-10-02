import { useState } from 'react';
import { Link } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import CTABanner from '@/components/ui/CTABanner';
import { getProductQuantityLimit } from '@/lib/productLimits';
import { getUnitPrice, formatINR } from '@/lib/pricing';
import { siteConfig } from '@/lib/site';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [limitNoticeIndex, setLimitNoticeIndex] = useState<number | null>(null);
  const cartTotal = items.reduce(
    (sum, item) => sum + getUnitPrice(item.product, item.packaging) * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <>
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
              <ShoppingCart className="h-10 w-10 text-navy-300" />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-navy-900">
              Your Cart is Empty
            </h1>
            <p className="mt-3 text-navy-600">
              Browse our products and add items to your cart to get started with
              your bulk order.
            </p>
            <Link to="/products" className="mt-6 btn-primary">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <CTABanner />
      </>
    );
  }

  return (
    <>
      <div className="border-b border-cream-200 bg-white">
        <div className="container-wide py-8">
          <h1 className="font-display text-3xl font-bold text-navy-900">
            Your Cart
          </h1>
          <p className="mt-2 text-navy-600">
            Review your items and proceed to checkout. Payment is Cash on Delivery.
          </p>
        </div>
      </div>

      <div className="container-wide py-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => {
                const maxQty = getProductQuantityLimit(item.product.id);
                const unitPrice = getUnitPrice(item.product, item.packaging);
                return (
                  <div
                    key={`${item.product.id}-${item.packaging}`}
                    className="card flex gap-4 p-4"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-display text-base font-semibold text-navy-900 hover:text-teal-600"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-0.5 text-xs text-navy-500">
                            {item.product.sub_type} — {item.packaging}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 transition-colors hover:bg-coral-50 hover:text-coral-600"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex items-center rounded-lg border border-cream-300">
                          <button
                            onClick={() => {
                              setLimitNoticeIndex(null);
                              updateQuantity(index, item.quantity - 1);
                            }}
                            className="flex h-9 w-9 items-center justify-center text-navy-700 hover:bg-cream-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-12 text-center text-sm font-semibold text-navy-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              if (item.quantity >= maxQty) {
                                setLimitNoticeIndex(index);
                                return;
                              }
                              setLimitNoticeIndex(null);
                              updateQuantity(index, item.quantity + 1);
                            }}
                            className="flex h-9 w-9 items-center justify-center text-navy-700 hover:bg-cream-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-coral-600">
                            {formatINR(unitPrice * item.quantity)}
                          </p>
                          <p className="text-[11px] text-navy-400">
                            {formatINR(unitPrice)} / {item.packaging}
                          </p>
                        </div>
                      </div>
                      {limitNoticeIndex === index && (
                        <p className="mt-2 text-xs font-medium text-coral-600">
                          Max {maxQty} units online for this product. Email{' '}
                          <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="underline hover:text-coral-700"
                          >
                            {siteConfig.contact.email}
                          </a>{' '}
                          to order more.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                Order Summary
              </h2>
              <div className="mt-4 space-y-3 border-b border-cream-200 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Total Items</span>
                  <span className="font-medium text-navy-900">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Product Lines</span>
                  <span className="font-medium text-navy-900">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Estimated Delivery</span>
                  <span className="font-medium text-teal-600">24-48 hours</span>
                </div>
              </div>
              <div className="border-b border-cream-200 py-4">
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-navy-900">Order Total</span>
                  <span className="font-display font-bold text-coral-600">
                    {formatINR(cartTotal)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2.5 text-xs text-teal-800">
                <Info className="h-3.5 w-3.5 flex-shrink-0" />
                Pay {formatINR(cartTotal)} in cash at the time of delivery.
              </div>
              <Link to="/checkout" className="mt-4 btn-primary w-full">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
