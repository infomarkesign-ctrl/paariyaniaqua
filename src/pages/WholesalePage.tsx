import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import CTABanner from '@/components/ui/CTABanner';
import { facilityImages } from '@/lib/site';
import {
  Boxes,
  RefreshCw,
  PackageCheck,
  Network,
  ArrowRight,
  ClipboardList,
  Phone,
  Check,
  DollarSign,
} from 'lucide-react';

export default function WholesalePage() {
  const services = [
    {
      icon: Boxes,
      title: 'Bulk Supply',
      desc: 'We fulfill large-volume orders across all product categories — meat, fish & seafood, and eggs. Whether you need a one-time bulk delivery or ongoing regular supply, our stock capacity and logistics network can handle it.',
    },
    {
      icon: RefreshCw,
      title: 'Regular Procurement Contracts',
      desc: 'For businesses with consistent requirements, we offer scheduled supply agreements. Set up daily, weekly, or monthly delivery schedules tailored to your consumption patterns, ensuring you never run out of stock.',
    },
    {
      icon: PackageCheck,
      title: 'Customized Requirements',
      desc: 'Need specific cuts, particular packaging sizes, or mixed product orders? We customize our supply to match your exact requirements — from specialized meat cuts to mixed seafood combos and bulk egg crates.',
    },
    {
      icon: Network,
      title: 'B2B Distribution Network',
      desc: 'Our established logistics network covers Mumbai and surrounding regions. We understand the urgency of B2B supply and maintain reliable delivery schedules to keep your operations running smoothly.',
    },
  ];

  const steps = [
    { num: '1', title: 'Submit an Enquiry', desc: 'Tell us your requirements through our quote form or by phone.' },
    { num: '2', title: 'Receive a Quote', desc: 'We send you a customized quote with bulk pricing within 24 hours.' },
    { num: '3', title: 'Confirm Your Order', desc: 'Review and confirm the order details, quantities, and delivery schedule.' },
    { num: '4', title: 'Get Delivered', desc: 'We process, pack, and deliver your order with cold chain maintained. Pay by COD.' },
  ];

  return (
    <>
      <PageHeader
        title="Wholesale Solutions"
        subtitle="B2B wholesale supply services designed for businesses that demand reliability, scale, and flexibility. From bulk orders to long-term procurement contracts."
        breadcrumbs={[{ label: 'Wholesale Solutions' }]}
        bgImage={facilityImages.warehouse}
      />

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Our Services</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Flexible Wholesale Supply Options
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <div key={i} className="card card-hover p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                  <service.icon className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-navy-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">How It Works</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Setting Up a Wholesale Account
            </h2>
            <p className="mt-3 text-navy-600">
              Getting started is simple. Follow these four steps to begin your
              wholesale supply partnership with us.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-navy-800 to-navy-900 font-display text-2xl font-bold text-teal-400">
                  {step.num}
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-navy-600">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-8 hidden h-0.5 w-6 bg-cream-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="section-label">Pricing</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                Volume-Based Wholesale Pricing
              </h2>
              <p className="mt-4 text-navy-600">
                Our pricing is structured to reward bulk orders. The larger your
                order, the more competitive your rate. Because each business has
                unique requirements, we provide customized quotes based on:
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Product type and category mix',
                  'Order volume and quantity',
                  'Delivery frequency (one-time vs. contract)',
                  'Packaging and customization requirements',
                  'Delivery location',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <Check className="h-4 w-4 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  <DollarSign className="h-4 w-4" />
                  Contact for Bulk Pricing
                </Link>
                <Link to="/products" className="btn-outline">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-teal-400" />
                <h3 className="font-display text-xl font-bold">Request a Quote</h3>
              </div>
              <p className="mt-4 text-sm text-cream-300">
                Get a customized quote within 24 hours. Tell us your product
                requirements, quantities, and delivery area.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-navy-800 p-4">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span className="text-sm">Call us directly for immediate assistance</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-navy-800 p-4">
                  <ClipboardList className="h-5 w-5 text-teal-400" />
                  <span className="text-sm">Submit enquiry form for a detailed quote</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-navy-800 p-4">
                  <Check className="h-5 w-5 text-teal-400" />
                  <span className="text-sm">Cash on Delivery — no advance required</span>
                </div>
              </div>
              <Link to="/contact" className="mt-6 btn-primary w-full">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
