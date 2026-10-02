import PageHeader from '@/components/ui/PageHeader';
import CTABanner from '@/components/ui/CTABanner';
import { facilityImages } from '@/lib/site';
import {
  Search,
  ClipboardCheck,
  HandHeart,
  Warehouse,
  Truck,
  MapPin,
  ArrowRight,
  Home,
  Fish,
  Egg,
  Beef,
} from 'lucide-react';

export default function SourcingPage() {
  const sources = [
    {
      icon: Home,
      title: 'Poultry Farms',
      desc: 'Chicken and eggs are sourced from verified poultry farms that maintain healthy flocks, proper nutrition, and clean environments. We prioritize farms with consistent quality and reliable supply capacity.',
    },
    {
      icon: Beef,
      title: 'Livestock Suppliers',
      desc: 'Mutton, goat, and buffalo meat is sourced from trusted livestock suppliers who raise healthy animals. We ensure humane practices and quality feed for superior meat quality.',
    },
    {
      icon: Fish,
      title: 'Coastal Fisheries',
      desc: "Fish and seafood is sourced fresh from coastal fisheries and trusted suppliers. Our proximity to Mumbai's coast allows us to access fresh catch quickly, maintaining quality from sea to facility.",
    },
    {
      icon: Egg,
      title: 'Hatcheries & Egg Farms',
      desc: 'Eggs are sourced daily from verified poultry farms and hatcheries. We ensure shell integrity, freshness, and consistent quality across all egg varieties we supply.',
    },
  ];

  const supplyChain = [
    { icon: Search, title: 'Sourcing', desc: 'Verified farms, fisheries & hatcheries' },
    { icon: ClipboardCheck, title: 'Processing', desc: 'Hygienic processing & quality check' },
    { icon: Warehouse, title: 'Cold Storage', desc: 'Temperature-controlled storage' },
    { icon: HandHeart, title: 'Packing', desc: 'Hygienic, cold-chain-ready packaging' },
    { icon: Truck, title: 'Distribution', desc: 'Cold chain delivery to your business' },
  ];

  return (
    <>
      <PageHeader
        title="Sourcing & Supply"
        subtitle="Understanding where our products come from and how they reach you — our sourcing standards and supply chain process explained."
        breadcrumbs={[{ label: 'Sourcing & Supply' }]}
        bgImage={facilityImages.logistics}
      />

      {/* Sourcing */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Where We Source</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Trusted Sources, Verified Quality
            </h2>
            <p className="mt-3 text-navy-600">
              We source our products from a network of verified suppliers who
              share our commitment to quality and hygiene.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sources.map((source, i) => (
              <div key={i} className="card card-hover p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                  <source.icon className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                  {source.title}
                </h3>
                <p className="mt-3 text-sm text-navy-600">{source.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Supply Chain</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              From Source to Your Doorstep
            </h2>
            <p className="mt-3 text-navy-600">
              Our supply chain is designed to maintain quality and freshness at
              every stage — from sourcing to delivery.
            </p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {supplyChain.map((step, i) => (
              <div key={i} className="relative">
                <div className="card h-full p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900">
                    <step.icon className="h-8 w-8 text-teal-400" />
                  </div>
                  <div className="mt-2 text-xs font-bold text-coral-500">
                    Stage {i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-sm font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-navy-600">{step.desc}</p>
                </div>
                {i < supplyChain.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-6 w-6 text-cream-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="section-label">Supply Coverage</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                Areas We Supply To
              </h2>
              <p className="mt-4 text-navy-600">
                We currently supply across Mumbai and surrounding regions in
                Maharashtra. Our delivery network is expanding, and we're
                continually adding new areas to our coverage.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  'Mumbai City',
                  'Mumbai Suburban',
                  'Navi Mumbai',
                  'Thane',
                  'Bhandup',
                  'Andheri',
                  'Dadar',
                  'Pydhonie & South Mumbai',
                ].map((area, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-700"
                  >
                    <MapPin className="h-4 w-4 text-teal-600" />
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-navy-400">
                Don't see your area? Contact us — we may already supply to your
                location or can arrange delivery.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card">
              <iframe
                title="Mumbai supply coverage area"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120660.71317727557!2d72.82550515!3d19.08262715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
