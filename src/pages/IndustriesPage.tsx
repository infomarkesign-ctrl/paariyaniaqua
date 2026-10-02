import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import CTABanner from '@/components/ui/CTABanner';
import {
  Building2,
  UtensilsCrossed,
  Store,
  Network,
  ChefHat,
  Hospital,
  ArrowRight,
} from 'lucide-react';

const industries = [
  {
    icon: Building2,
    title: 'Hotels',
    desc: 'Premium quality supply for hotel kitchens of all sizes — from boutique hotels to large chains. We understand the high standards of hotel kitchens and supply products that meet those expectations. Regular delivery schedules and bulk quantities available.',
    points: ['Consistent premium quality', 'Scheduled daily/weekly deliveries', 'Customized cuts on request'],
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    desc: 'Fresh ingredients delivered to restaurant kitchens across Mumbai. Whether you run a single location or multiple outlets, we provide reliable supply with the freshness and consistency your menu demands.',
    points: ['Daily fresh delivery', 'Multiple product categories', 'Flexible order quantities'],
  },
  {
    icon: Store,
    title: 'Retailers',
    desc: 'Reliable wholesale supply for retail meat, fish, and egg shops. We provide bulk quantities at competitive wholesale rates, helping retailers maintain stock and maximize margins.',
    points: ['Competitive wholesale rates', 'Bulk supply availability', 'Regular restocking'],
  },
  {
    icon: Network,
    title: 'Distributors',
    desc: 'Bulk supply partnerships for regional distribution networks. We serve as a dependable upstream supplier for distributors who need consistent, large-volume supply with reliable delivery.',
    points: ['Large-volume supply capacity', 'Consistent quality standards', 'Long-term supply contracts'],
  },
  {
    icon: ChefHat,
    title: 'Food Businesses',
    desc: 'Consistent supply for QSRs, cloud kitchens, food brands, and catering companies. We understand the demands of food businesses and provide the reliability and scale you need to operate without disruption.',
    points: ['Reliable bulk supply', 'Customized specifications', 'Regular delivery schedules'],
  },
  {
    icon: Hospital,
    title: 'Institutional Buyers',
    desc: 'Canteens, caterers, hospitals, and institutional food service operations. We supply bulk quantities with the hygiene and quality standards required for institutional cooking at scale.',
    points: ['Hygienic, quality-assured products', 'Large bulk quantities', 'Reliable delivery for operations'],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        title="Industries We Serve"
        subtitle="We supply across the entire food service spectrum — from luxury hotels to institutional canteens. Every industry has unique needs, and we tailor our supply accordingly."
        breadcrumbs={[{ label: 'Industries We Serve' }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="space-y-8">
            {industries.map((industry, i) => (
              <div
                key={i}
                className={`card overflow-hidden lg:grid lg:grid-cols-3 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Content */}
                <div className="p-7 lg:col-span-2 lg:p-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-50">
                      <industry.icon className="h-7 w-7 text-coral-600" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                      {industry.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-navy-600">{industry.desc}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {industry.points.map((point, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 rounded-lg bg-cream-50 px-3 py-2 text-xs font-medium text-navy-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                        {point}
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Enquire about supply for {industry.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                {/* Image / Visual */}
                <div className="relative hidden bg-navy-900 lg:block">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <industry.icon className="h-32 w-32 text-navy-700" strokeWidth={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Does Your Business Need a Reliable Wholesale Supplier?"
        subtitle="Whatever industry you're in, we can tailor our supply to meet your needs. Contact us to discuss your requirements."
      />
    </>
  );
}
