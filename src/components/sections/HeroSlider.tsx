import { useState, useEffect, useCallback } from 'react';
import { Link } from '@/lib/router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroImages } from '@/lib/site';

interface Slide {
  image: string;
  headline: string;
  subtext: string;
  ctas: { label: string; to: string; primary?: boolean }[];
}

const slides: Slide[] = [
  {
    image: heroImages.coldStorage,
    headline: "Mumbai's Trusted Wholesale Supplier of Meat, Fish & Eggs",
    subtext:
      'Reliable bulk supply of premium quality meat, fresh seafood, and farm eggs to hotels, restaurants, retailers, and institutions. Hygienically processed, cold chain maintained.',
    ctas: [
      { label: 'Get a Quote', to: '/contact', primary: true },
      { label: 'Explore Products', to: '/products' },
    ],
  },
  {
    image: heroImages.meat,
    headline: 'Premium Quality Meat, Supplied in Bulk',
    subtext:
      'Fresh chicken, mutton, goat, buffalo, and specialty meats — hygienically processed and delivered at scale for your commercial kitchen.',
    ctas: [
      { label: 'Explore Meat Products', to: '/products/meat', primary: true },
    ],
  },
  {
    image: heroImages.fish,
    headline: 'Fresh Catch, Delivered at Scale',
    subtext:
      'From pomfret and surmai to prawns and crab — sourced fresh from coastal fisheries and delivered with the cold chain intact.',
    ctas: [
      { label: 'Explore Fish & Seafood', to: '/products/fish-seafood', primary: true },
    ],
  },
  {
    image: heroImages.eggs,
    headline: 'Reliable Bulk Egg Supply for Your Business',
    subtext:
      'White eggs, brown eggs, bulk crates, and specialty eggs — sourced fresh daily from verified poultry farms for your wholesale needs.',
    ctas: [
      { label: 'Explore Egg Products', to: '/products/eggs', primary: true },
    ],
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay-dark" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-wide w-full">
          <div className="max-w-2xl">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`${i === current ? 'block animate-fade-in-up' : 'hidden'}`}
              >
                <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-5 max-w-xl text-base text-cream-200 sm:text-lg lg:text-xl">
                  {slide.subtext}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {slide.ctas.map((cta) => (
                    <Link
                      key={cta.label}
                      to={cta.to}
                      className={cta.primary ? 'btn-primary' : 'btn-outline-light'}
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
