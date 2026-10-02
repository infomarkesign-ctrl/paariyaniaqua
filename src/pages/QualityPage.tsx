import PageHeader from '@/components/ui/PageHeader';
import CTABanner from '@/components/ui/CTABanner';
import { facilityImages, siteConfig } from '@/lib/site';
import {
  Search,
  ClipboardCheck,
  HandHeart,
  Warehouse,
  RefreshCw,
  ShieldCheck,
  Award,
  FileCheck,
  BadgeCheck,
} from 'lucide-react';

export default function QualityPage() {
  const standards = [
    {
      icon: Search,
      title: 'Quality Sourcing',
      desc: 'We source our products from verified farms, fisheries, and hatcheries that meet our stringent quality criteria. Every supplier is evaluated for their practices, hygiene standards, and product consistency before being approved.',
    },
    {
      icon: ClipboardCheck,
      title: 'Inspection at Every Stage',
      desc: 'Our multi-stage inspection process ensures quality from arrival to dispatch. Products are checked at intake, during processing, before packing, and prior to delivery. Any product that does not meet our standards is rejected.',
    },
    {
      icon: HandHeart,
      title: 'Hygienic Handling',
      desc: 'All processing is done in sanitized facilities with strict hygiene protocols. Our handlers use protective gear including gloves, hairnets, and clean uniforms. Tools and surfaces are sanitized regularly to prevent contamination.',
    },
    {
      icon: Warehouse,
      title: 'Safe Cold Storage',
      desc: 'Temperature-controlled storage facilities maintain the cold chain from the moment products arrive. Different products are stored at their optimal temperatures to preserve freshness and prevent spoilage.',
    },
    {
      icon: RefreshCw,
      title: 'Ongoing Quality Assurance',
      desc: "Quality doesn't stop at delivery. We continuously monitor our processes, gather client feedback, and improve our standards. Regular audits and process reviews ensure we maintain consistent quality over time.",
    },
  ];

  const certifications = [
    { icon: Award, title: 'FSSAI Compliance', desc: siteConfig.fssai },
    { icon: FileCheck, title: 'Food Safety Standards', desc: 'Adherence to established food safety and handling guidelines.' },
    { icon: BadgeCheck, title: 'Hygiene Protocols', desc: 'Sanitized facilities, protective gear, and regular cleanliness audits.' },
    { icon: ShieldCheck, title: 'Cold Chain Certification', desc: 'Temperature monitoring throughout storage and transport.' },
  ];

  return (
    <>
      <PageHeader
        title="Quality & Food Safety"
        subtitle="Our commitment to quality and food safety is uncompromising. From sourcing to delivery, every step is designed to ensure you receive fresh, hygienic, and safe products."
        breadcrumbs={[{ label: 'Quality & Food Safety' }]}
        bgImage={facilityImages.quality}
      />

      {/* Standards */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Our Standards</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              A 5-Step Quality Assurance Process
            </h2>
          </div>
          <div className="mt-12 space-y-6">
            {standards.map((s, i) => (
              <div
                key={i}
                className={`card card-hover grid gap-6 p-7 lg:grid-cols-[auto_1fr_2fr] lg:items-center`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
                  <s.icon className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-coral-500">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-navy-900">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-navy-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Photos */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Our Facility</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Hygienic Processing & Cold Storage
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <img
              src={facilityImages.processing}
              alt="Processing facility"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.coldStorage}
              alt="Cold storage"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.quality}
              alt="Quality control"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.warehouse}
              alt="Warehouse"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.logistics}
              alt="Refrigerated delivery"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <img
              src={facilityImages.kitchen}
              alt="Commercial kitchen supply"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Compliance</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Certifications & Compliance
            </h2>
            <p className="mt-3 text-navy-600">
              We adhere to food safety regulations and maintain standards that
              ensure the quality and safety of every product we supply.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coral-50">
                  <cert.icon className="h-7 w-7 text-coral-600" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-navy-900">
                  {cert.title}
                </h3>
                <p className="mt-2 text-xs text-navy-600">{cert.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-navy-400">
            Note: Certification and license details to be confirmed and updated by the client.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
