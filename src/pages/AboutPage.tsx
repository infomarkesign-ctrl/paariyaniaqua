import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import CTABanner from '@/components/ui/CTABanner';
import { facilityImages, siteConfig } from '@/lib/site';
import {
  ShieldCheck,
  Truck,
  Snowflake,
  HandHeart,
  Target,
  Eye,
  ArrowRight,
  MapPin,
  Building2,
} from 'lucide-react';

export default function AboutPage() {
  const differentiators = [
    {
      icon: ShieldCheck,
      title: 'Uncompromised Quality',
      desc: 'Every product undergoes multi-stage quality checks. We never compromise on the freshness and quality that our clients depend on.',
    },
    {
      icon: HandHeart,
      title: 'Hygiene First',
      desc: 'Our processing follows strict hygiene protocols — sanitized facilities, proper protective gear, and food safety standards at every step.',
    },
    {
      icon: Truck,
      title: 'Reliable at Scale',
      desc: 'Large stock capacity and an established logistics network mean we fulfill bulk orders consistently and on time, every time.',
    },
    {
      icon: Snowflake,
      title: 'Cold Chain Integrity',
      desc: 'Temperature-controlled storage and transport ensure that freshness is preserved from our facility to your doorstep.',
    },
  ];

  return (
    <>
      <PageHeader
        title="About Pariyani Aqua Pearl"
        subtitle="Mumbai's trusted B2B wholesale supplier of meat, fish & seafood, and eggs — serving hotels, restaurants, retailers, and institutions with quality and reliability."
        breadcrumbs={[{ label: 'About Us' }]}
        bgImage={facilityImages.warehouse}
      />

      {/* Company Story */}
      <section className="py-16 lg:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              A Wholesale Partner Built on Trust and Quality
            </h2>
            <p className="mt-4 text-navy-600">
              Pariyani Aqua Pearl Private Limited is a Mumbai-based wholesale
              trading company specializing in the bulk supply of meat, fish &
              seafood, and eggs. Based in the heart of Mumbai, Maharashtra, we
              serve a diverse clientele across the food service industry.
            </p>
            <p className="mt-3 text-navy-600">
              We understand that B2B buyers need more than just products — they
              need a reliable partner who can consistently deliver quality at
              scale. That's why we've built our business around three core
              principles: quality sourcing, hygienic processing, and dependable
              delivery.
            </p>
            <p className="mt-3 text-navy-600">
              From neighborhood restaurants to large institutional kitchens, we
              supply businesses of all sizes with the same commitment to freshness,
              hygiene, and service excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={facilityImages.processing}
              alt="Processing facility"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.quality}
              alt="Quality control"
              className="mt-8 aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.coldStorage}
              alt="Cold storage"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.logistics}
              alt="Logistics and delivery"
              className="mt-8 aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          <div className="card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-50">
              <Target className="h-6 w-6 text-coral-600" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
              Our Mission
            </h3>
            <p className="mt-3 text-navy-600">
              To be the most reliable wholesale supplier of meat, fish, and eggs
              in Mumbai — delivering consistently fresh, hygienically processed
              products at competitive bulk prices, enabling our clients to serve
              their customers with confidence.
            </p>
          </div>
          <div className="card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <Eye className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
              Our Vision
            </h3>
            <p className="mt-3 text-navy-600">
              To become the preferred B2B wholesale partner for the food service
              industry across Maharashtra — recognized for quality, trusted for
              reliability, and valued for the long-term partnerships we build with
              every client.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">What Sets Us Apart</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Why Businesses Choose Us
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <div key={i} className="card card-hover p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900">
                  <item.icon className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-navy-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registered Business Details */}
      <section className="bg-navy-900 py-16">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Registered Business
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                {siteConfig.legalName}
              </h2>
              <div className="mt-4 flex items-start gap-3 text-cream-300">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                <p className="text-sm leading-relaxed">
                  {siteConfig.address.full}
                </p>
              </div>
              <div className="mt-4 flex items-start gap-3 text-cream-300">
                <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                <p className="text-sm">
                  Business: Wholesale trade of Meat, Fish/Seafood, and Eggs (B2B)
                </p>
              </div>
            </div>
            <div className="lg:text-right">
              <Link to="/contact" className="btn-primary">
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
