import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import { facilityImages } from '@/lib/site';
import {
  ShieldCheck,
  Truck,
  Snowflake,
  HandHeart,
  DollarSign,
  Boxes,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

export default function WhyChooseUsPage() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      desc: 'Every product batch undergoes multi-stage quality inspection. We source from verified suppliers, inspect at intake, during processing, and before dispatch. Products that don\'t meet our standards are rejected — no exceptions. This ensures you consistently receive premium quality products.',
    },
    {
      icon: Truck,
      title: 'Reliable Supply',
      desc: 'We maintain large stock capacity and an established logistics network, enabling us to fulfill bulk orders consistently and on time. For businesses with regular needs, we offer procurement contracts with scheduled deliveries, so you never have to worry about stock availability.',
    },
    {
      icon: Snowflake,
      title: 'Guaranteed Freshness',
      desc: 'Our cold chain process preserves freshness from source to delivery. Products are stored at optimal temperatures, transported in temperature-controlled vehicles, and packed to maintain cold chain integrity. You receive products as fresh as when they were processed.',
    },
    {
      icon: HandHeart,
      title: 'Strict Hygiene Standards',
      desc: 'Our processing facilities follow strict hygiene protocols. Handlers use protective gear including gloves and hairnets. Facilities and equipment are sanitized regularly. We maintain food safety standards at every step to ensure product safety and quality.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      desc: 'Our volume-based pricing structure rewards bulk orders — the larger your order, the more competitive your rate. We offer customized quotes based on your specific requirements, ensuring you get the best value for your wholesale purchase.',
    },
    {
      icon: Boxes,
      title: 'Bulk Availability',
      desc: 'With large stock capacity across all product categories, we can fulfill bulk orders of any scale. Whether you need a one-time large delivery or regular ongoing supply, we have the inventory and infrastructure to meet your demands.',
    },
  ];

  const comparison = [
    { feature: 'Multi-stage quality inspection', pariyanai: true, typical: false },
    { feature: 'Cold chain maintained end-to-end', pariyanai: true, typical: false },
    { feature: 'Regular procurement contracts', pariyanai: true, typical: false },
    { feature: 'Customized packaging & cuts', pariyanai: true, typical: true },
    { feature: 'Hygienic processing facility', pariyanai: true, typical: false },
    { feature: 'Volume-based wholesale pricing', pariyanai: true, typical: true },
    { feature: 'Cash on Delivery (no advance)', pariyanai: true, typical: false },
    { feature: 'B2B-focused supply model', pariyanai: true, typical: false },
    { feature: 'Dedicated customer support', pariyanai: true, typical: false },
  ];

  return (
    <>
      <PageHeader
        title="Why Choose Us"
        subtitle="Six reasons why businesses across Mumbai trust Pariyani Aqua Pearl as their wholesale meat, fish, and egg supplier."
        breadcrumbs={[{ label: 'Why Choose Us' }]}
        bgImage={facilityImages.processing}
      />

      {/* Points */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Our Advantages</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              What Makes Us Different
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {points.map((point, i) => (
              <div key={i} className="card card-hover p-7">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-50">
                    <point.icon className="h-7 w-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-600">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Comparison</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Pariyani Aqua Pearl vs. Typical Suppliers
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200 bg-navy-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Pariyani Aqua Pearl
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Typical Supplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-navy-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.pariyanai ? (
                        <Check className="mx-auto h-5 w-5 text-teal-600" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-navy-300" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.typical ? (
                        <Check className="mx-auto h-5 w-5 text-teal-600" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-navy-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-navy-400">
            Comparison is illustrative based on common wholesale supplier practices.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-2xl bg-cta-gradient p-10 text-center lg:p-14">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to Partner with a Trusted Wholesale Supplier?
            </h2>
            <p className="mt-4 text-cream-300">
              Experience the Pariyani Aqua Pearl difference. Get a customized
              quote for your business today.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="btn-outline-light">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
