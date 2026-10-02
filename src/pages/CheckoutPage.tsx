import { useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getUnitPrice, formatINR } from '@/lib/pricing';
import { siteConfig } from '@/lib/site';
import {
  Check,
  Banknote,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Loader2,
  Package,
  Truck,
  FileText,
  Smartphone,
  CreditCard,
  Landmark,
  Lock,
  LogIn,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    business_name: '',
    contact_person: '',
    phone: '',
    email: '',
    delivery_address: '',
    gstin: '',
    delivery_instructions: '',
    agreed_terms: false,
  });

  if (orderId) {
    return (
      <div className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <Check className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-navy-900">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 text-navy-600">
            Thank you for your order. Our team will contact you shortly to confirm
            details and arrange delivery.
          </p>
          <div className="mt-6 rounded-xl border border-cream-200 bg-cream-50 p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-navy-700">Order Reference</span>
              <span className="font-display font-bold text-navy-900">
                #{orderId.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="mt-3 border-t border-cream-200 pt-3">
              <p className="text-sm text-navy-600">
                <strong>Order Total:</strong> {formatINR(orderTotal)}
              </p>
              <p className="mt-1 text-sm text-navy-600">
                <strong>Payment:</strong> {siteConfig.payment}
              </p>
              <p className="mt-1 text-sm text-navy-600">
                <strong>Delivery:</strong> Within 24-48 hours of confirmation
              </p>
            </div>
          </div>
          <Link to="/products" className="mt-6 btn-primary">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-x py-16 lg:py-24 text-center">
        <div className="mx-auto max-w-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <LogIn className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-navy-900">
            Login Required
          </h1>
          <p className="mt-3 text-navy-600">
            Please sign in or create an account to place an order. This helps us confirm your details and arrange delivery.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate('/login')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In / Create Account
            </button>
            <Link to="/products" className="btn-ghost flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-16 lg:py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Your Cart is Empty
        </h1>
        <p className="mt-3 text-navy-600">
          Add products to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="mt-6 btn-primary">
          Browse Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const cartTotal = items.reduce(
    (sum, item) => sum + getUnitPrice(item.product, item.packaging) * item.quantity,
    0,
  );

  const canProceedStep1 =
    form.business_name.trim() &&
    form.contact_person.trim() &&
    form.phone.trim() &&
    form.delivery_address.trim();

  const handleSubmit = async () => {
    if (!form.agreed_terms) {
      setError('Please agree to the Terms & Conditions and Refund Policy to proceed.');
      return;
    }
    setSubmitting(true);
    setError('');

    setOrderTotal(cartTotal);
    setOrderId(crypto.randomUUID());
    clearCart();
    setSubmitting(false);
  };

  const steps = [
    { num: 1, label: 'Delivery Details', icon: Truck },
    { num: 2, label: 'Order Review', icon: Package },
    { num: 3, label: 'Payment', icon: Banknote },
  ];

  return (
    <>
      <div className="border-b border-cream-200 bg-white">
        <div className="container-wide py-8">
          <h1 className="font-display text-3xl font-bold text-navy-900">Checkout</h1>
          {/* Steps */}
          <div className="mt-6 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    step === s.num
                      ? 'bg-navy-900 text-white'
                      : step > s.num
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-cream-100 text-navy-500'
                  }`}
                >
                  {step > s.num ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-cream-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide py-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Details */}
            {step === 1 && (
              <div className="card p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-navy-900">
                  Delivery Details
                </h2>
                <p className="mt-1 text-sm text-navy-600">
                  Provide your business and delivery information.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Business Name <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.business_name}
                      onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                      className="input-field"
                      placeholder="Your hotel, restaurant, or business name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Contact Person <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contact_person}
                      onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                      className="input-field"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Phone <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      placeholder="you@business.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      GSTIN <span className="text-xs font-normal text-navy-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.gstin}
                      onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                      className="input-field"
                      placeholder="27AAAAA0000A1Z5"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Delivery Address <span className="text-coral-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.delivery_address}
                      onChange={(e) => setForm({ ...form, delivery_address: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Full delivery address with landmark and pincode"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-navy-700">
                      Delivery Instructions <span className="text-xs font-normal text-navy-400">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={form.delivery_instructions}
                      onChange={(e) => setForm({ ...form, delivery_instructions: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Any special delivery instructions, preferred timing, etc."
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continue to Review
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Order Review */}
            {step === 2 && (
              <div className="card p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-navy-900">
                  Order Review
                </h2>
                <p className="mt-1 text-sm text-navy-600">
                  Review your items and delivery details before placing the order.
                </p>

                {/* Delivery info recap */}
                <div className="mt-6 rounded-xl bg-cream-50 p-4">
                  <h3 className="text-sm font-semibold text-navy-900">Delivery To:</h3>
                  <div className="mt-2 text-sm text-navy-600">
                    <p className="font-medium text-navy-900">{form.business_name}</p>
                    <p>{form.contact_person} — {form.phone}</p>
                    <p>{form.delivery_address}</p>
                    {form.gstin && <p>GSTIN: {form.gstin}</p>}
                  </div>
                </div>

                {/* Items */}
                <div className="mt-6 space-y-3">
                  {items.map((item) => {
                    const unitPrice = getUnitPrice(item.product, item.packaging);
                    return (
                      <div
                        key={`${item.product.id}-${item.packaging}`}
                        className="flex items-center gap-4 rounded-xl border border-cream-200 p-3"
                      >
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-navy-900">{item.product.name}</p>
                          <p className="text-xs text-navy-500">
                            {item.packaging} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-coral-600">
                          {formatINR(unitPrice * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between border-t border-cream-200 pt-4">
                  <span className="font-semibold text-navy-900">Order Total</span>
                  <span className="font-display font-bold text-coral-600">
                    {formatINR(cartTotal)}
                  </span>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-ghost"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn-primary">
                    Continue to Payment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="card p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-navy-900">
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-navy-600">
                  Select your payment method to complete the order.
                </p>

                {/* Payment methods: COD enabled, others disabled */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-4 rounded-xl border-2 border-teal-500 bg-teal-50 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500">
                      <Banknote className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">Cash on Delivery (COD)</p>
                      <p className="text-sm text-navy-600">
                        Pay in cash at the time of delivery. No advance payment required.
                      </p>
                    </div>
                    <Check className="h-6 w-6 text-teal-600" />
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border-2 border-cream-200 bg-cream-50 p-5 opacity-60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-200">
                      <Smartphone className="h-6 w-6 text-navy-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-500">UPI</p>
                      <p className="text-sm text-navy-400">Google Pay, PhonePe, Paytm & more</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-navy-400">
                      <Lock className="h-3 w-3" />
                      Coming soon
                    </span>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border-2 border-cream-200 bg-cream-50 p-5 opacity-60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-200">
                      <CreditCard className="h-6 w-6 text-navy-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-500">Credit / Debit Card</p>
                      <p className="text-sm text-navy-400">Visa, Mastercard, RuPay & more</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-navy-400">
                      <Lock className="h-3 w-3" />
                      Coming soon
                    </span>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border-2 border-cream-200 bg-cream-50 p-5 opacity-60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-200">
                      <Landmark className="h-6 w-6 text-navy-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-500">Net Banking</p>
                      <p className="text-sm text-navy-400">All major banks supported</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-navy-400">
                      <Lock className="h-3 w-3" />
                      Coming soon
                    </span>
                  </div>

                  <div className="rounded-lg bg-cream-100 p-3 text-xs text-navy-500">
                    Note: We currently only accept Cash on Delivery. UPI, card, and net
                    banking payments will be available soon.
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreed_terms}
                      onChange={(e) => setForm({ ...form, agreed_terms: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-cream-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-navy-700">
                      I agree to the{' '}
                      <Link to="/terms-conditions" className="font-medium text-teal-600 hover:text-teal-700">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/refund-policy" className="font-medium text-teal-600 hover:text-teal-700">
                        Refund Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="mt-4 rounded-lg border border-coral-200 bg-coral-50 px-4 py-3 text-sm text-coral-700">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(2)} className="btn-ghost">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                Summary
              </h3>
              <div className="mt-4 space-y-2 border-b border-cream-200 pb-4">
                {items.map((item, index) => {
                  const unitPrice = getUnitPrice(item.product, item.packaging);
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-navy-600">
                        {item.product.name} ({item.packaging}) ×{item.quantity}
                      </span>
                      <span className="font-medium text-navy-900">
                        {formatINR(unitPrice * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Total Items</span>
                  <span className="font-medium text-navy-900">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Delivery</span>
                  <span className="font-medium text-teal-600">24-48 hrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy-600">Payment</span>
                  <span className="font-medium text-navy-900">COD</span>
                </div>
                <div className="flex justify-between border-t border-cream-200 pt-2 text-base">
                  <span className="font-semibold text-navy-900">Order Total</span>
                  <span className="font-display font-bold text-coral-600">
                    {formatINR(cartTotal)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-cream-50 p-3 text-xs text-navy-500">
                <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                Pay {formatINR(cartTotal)} in cash at the time of delivery. No advance
                payment required.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
