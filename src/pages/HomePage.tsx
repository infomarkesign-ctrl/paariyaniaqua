import { useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import HeroSlider from '@/components/sections/HeroSlider';
import ProductCard from '@/components/ui/ProductCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABanner from '@/components/ui/CTABanner';
import {
  whyChooseUsPoints,
  wholesalePoints,
  industriesPoints,
  qualityProcessSteps,
  howWeWorkSteps,
  testimonials,
  landingFAQs,
  CategoryCard,
  StatBar,
  SectionHeading,
  TrustBadgesRow,
} from '@/components/sections/shared';
import { fetchFeaturedProducts } from '@/lib/products';
import { heroImages, facilityImages } from '@/lib/site';
import type { Product } from '@/types';
import { ArrowRight, Star, Quote, ClipboardList } from 'lucide-react';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts(12).then((products) => {
      setFeatured(products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <HeroSlider />

      {/* Trust badges strip */}
      <section className="border-b border-cream-200 bg-white py-5">
        <div className="container-wide">
          <TrustBadgesRow />
        </div>
      </section>

      {/* About */}
      <section className="py-16 lg:py-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label">About Us</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl lg:text-4xl">
              Your Trusted B2B Wholesale Partner in Mumbai
            </h2>
            <p className="mt-4 text-base text-navy-600 lg:text-lg">
              Pariyani Aqua Pearl Private Limited is a Mumbai-based wholesale trader
              of meat, fish & seafood, and eggs. We supply hotels, restaurants,
              retailers, distributors, and institutional buyers with premium quality
              products — sourced fresh, processed hygienically, and delivered at scale.
            </p>
            <p className="mt-3 text-base text-navy-600 lg:text-lg">
              Our commitment to quality, hygiene, and reliability makes us the
              preferred wholesale partner for businesses across Mumbai and beyond.
            </p>
            <Link to="/about" className="mt-6 btn-secondary">
              Know More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={facilityImages.processing}
                alt="Hygienic processing facility"
                className="aspect-square w-full rounded-2xl object-cover shadow-card"
              />
              <img
                src={facilityImages.coldStorage}
                alt="Cold storage facility"
                className="mt-8 aspect-square w-full rounded-2xl object-cover shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="Our Products"
            title="Explore Our Product Categories"
            subtitle="Three core categories covering the complete range of meat, fish & seafood, and egg products for your wholesale needs."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <CategoryCard
              to="/products/meat"
              image={heroImages.meat}
              title="Meat Products"
              desc="Chicken, mutton, goat, buffalo, and specialty meats in bulk."
            />
            <CategoryCard
              to="/products/fish-seafood"
              image={heroImages.fish}
              title="Fish & Seafood"
              desc="Fresh fish, prawns, crab, and mixed seafood combos."
            />
            <CategoryCard
              to="/products/eggs"
              image={heroImages.eggs}
              title="Egg Products"
              desc="White eggs, brown eggs, bulk crates, and specialty eggs."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="Why Choose Us"
            title="Why Businesses Trust Pariyani Aqua Pearl"
            subtitle="Six reasons why hotels, restaurants, and institutions across Mumbai rely on us for their wholesale supply."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUsPoints.map((point, i) => (
              <div
                key={i}
                className="card card-hover p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <point.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-navy-600">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Solutions */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Wholesale Solutions
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                B2B Wholesale Supply, Built for Scale
              </h2>
              <p className="mt-4 text-base text-cream-300 lg:text-lg">
                From bulk orders to regular procurement contracts, we offer flexible
                wholesale solutions designed for businesses with demanding supply needs.
              </p>
              <Link to="/wholesale-solutions" className="mt-6 btn-primary">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {wholesalePoints.map((point, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-navy-700 bg-navy-800 p-5"
                >
                  <point.icon className="h-8 w-8 text-teal-400" />
                  <h3 className="mt-3 font-semibold text-white">{point.title}</h3>
                  <p className="mt-1.5 text-sm text-cream-400">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="Industries We Serve"
            title="Serving Diverse Business Sectors"
            subtitle="We supply across the food service spectrum — from luxury hotels to institutional canteens."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industriesPoints.map((industry, i) => (
              <div key={i} className="card card-hover flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-coral-50">
                  <industry.icon className="h-6 w-6 text-coral-600" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">
                    {industry.title}
                  </h3>
                  <p className="mt-1 text-sm text-navy-600">{industry.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/industries" className="btn-outline">
              View All Industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality & Food Safety */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="Quality & Food Safety"
            title="Our 5-Step Quality Assurance Process"
            subtitle="From sourcing to delivery, every step is monitored to ensure the highest standards of quality and food safety."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {qualityProcessSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="card h-full p-5 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                    <step.icon className="h-7 w-7 text-teal-600" />
                  </div>
                  <div className="mt-2 text-xs font-bold text-coral-500">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-sm font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-navy-600">{step.desc}</p>
                </div>
                {i < qualityProcessSteps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden h-0.5 w-4 -translate-y-1/2 bg-cream-300 lg:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/quality-food-safety" className="btn-outline">
              Learn About Our Standards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="How We Work"
            title="Our Supply Process"
            subtitle="A streamlined process from source to delivery, ensuring quality at every stage."
          />
          <div className="mt-12">
            <div className="grid gap-4 lg:grid-cols-5">
              {howWeWorkSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="card h-full p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900">
                      <step.icon className="h-8 w-8 text-teal-400" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-navy-600">{step.desc}</p>
                  </div>
                  {i < howWeWorkSteps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ArrowRight className="h-6 w-6 text-cream-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-950 py-16">
        <div className="container-wide">
          <StatBar />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <SectionHeading
              label="Featured Products"
              title="Top Picks from Our Catalog"
              center={false}
            />
            <Link to="/products" className="btn-outline whitespace-nowrap">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-100"
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            subtitle="Trusted by businesses across Mumbai for quality, reliability, and service."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <Quote className="h-8 w-8 text-teal-200" />
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-coral-400 text-coral-400"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  "{t.quote}"
                </p>
                <div className="mt-4 border-t border-cream-200 pt-4">
                  <p className="font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-navy-500">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about our wholesale supply."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion items={landingFAQs} defaultOpen={0} />
            <div className="mt-6 text-center">
              <Link to="/faq" className="btn-outline">
                <ClipboardList className="h-4 w-4" />
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
