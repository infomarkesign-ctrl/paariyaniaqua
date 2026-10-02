import { Link } from '@/lib/router';
import { TextQuote, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export default function CTABanner({
  title = 'Looking for a Reliable Wholesale Meat, Fish & Egg Supplier?',
  subtitle = 'Get competitive bulk pricing, guaranteed freshness, and timely delivery for your business. Contact us today for a customized quote.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 lg:py-20">
      <div className="absolute inset-0 bg-cta-gradient" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-hero-overlay opacity-20" />
      <div className="container-wide relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-cream-300 lg:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/contact" className="btn-primary">
            <TextQuote className="h-5 w-5" />
            Get a Quote
          </Link>
          <Link to="/contact" className="btn-outline-light">
            <Phone className="h-5 w-5" />
            Contact Us
          </Link>
        </div>
        <p className="mt-6 text-xs text-cream-400">
          {siteConfig.payment} — No advance payment required
        </p>
      </div>
    </section>
  );
}
