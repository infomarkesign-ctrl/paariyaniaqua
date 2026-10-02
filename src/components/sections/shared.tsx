import { Link } from '@/lib/router';
import {
  ShieldCheck,
  Truck,
  Snowflake,
  PackageCheck,
  DollarSign,
  Boxes,
  Building2,
  UtensilsCrossed,
  Store,
  Network,
  ChefHat,
  Hospital,
  Search,
  ClipboardCheck,
  HandHeart,
  Warehouse,
  RefreshCw,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const whyChooseUsPoints = [
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    desc: 'Every batch is inspected at multiple stages to ensure premium quality standards.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply',
    desc: 'Consistent availability and on-time delivery to keep your operations running.',
  },
  {
    icon: Snowflake,
    title: 'Guaranteed Freshness',
    desc: 'Cold chain maintained from source to delivery for maximum freshness.',
  },
  {
    icon: HandHeart,
    title: 'Strict Hygiene Standards',
    desc: 'Hygienically processed in clean facilities with proper food safety protocols.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    desc: 'Volume-based wholesale pricing that maximizes value for your business.',
  },
  {
    icon: Boxes,
    title: 'Bulk Availability',
    desc: 'Large stock capacity to fulfill bulk orders of any scale, on demand.',
  },
];

export const wholesalePoints = [
  {
    icon: Boxes,
    title: 'Bulk Supply',
    desc: 'Large-volume orders fulfilled with consistent quality and timely delivery.',
  },
  {
    icon: RefreshCw,
    title: 'Regular Procurement Contracts',
    desc: 'Scheduled supply agreements for businesses with ongoing requirements.',
  },
  {
    icon: PackageCheck,
    title: 'Customized Requirements',
    desc: 'Tailored cuts, packaging, and quantities to match your specific needs.',
  },
  {
    icon: Network,
    title: 'B2B Distribution Network',
    desc: 'Established logistics network across Mumbai and surrounding regions.',
  },
];

export const industriesPoints = [
  {
    icon: Building2,
    title: 'Hotels',
    desc: 'Premium quality supply for hotel kitchens of all sizes.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    desc: 'Fresh ingredients delivered daily to restaurant kitchens.',
  },
  {
    icon: Store,
    title: 'Retailers',
    desc: 'Reliable wholesale supply for retail meat and fish shops.',
  },
  {
    icon: Network,
    title: 'Distributors',
    desc: 'Bulk supply partnerships for regional distribution networks.',
  },
  {
    icon: ChefHat,
    title: 'Food Businesses',
    desc: 'Consistent supply for QSRs, cloud kitchens, and food brands.',
  },
  {
    icon: Hospital,
    title: 'Institutional Buyers',
    desc: 'Canteens, caterers, hospitals, and institutional food service.',
  },
];

export const qualityProcessSteps = [
  {
    icon: Search,
    title: 'Quality Sourcing',
    desc: 'Verified farms, fisheries, and hatcheries.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection at Every Stage',
    desc: 'Multi-point quality checks throughout.',
  },
  {
    icon: HandHeart,
    title: 'Hygienic Handling',
    desc: 'Gloves, hairnets, and sanitised tools.',
  },
  {
    icon: Warehouse,
    title: 'Safe Cold Storage',
    desc: 'Temperature-controlled storage maintained.',
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Quality Assurance',
    desc: 'Continuous monitoring and standards checks.',
  },
];

export const howWeWorkSteps = [
  { icon: Search, title: 'Source', desc: 'From verified farms & fisheries' },
  { icon: ClipboardCheck, title: 'Quality Check', desc: 'Multi-stage inspection' },
  { icon: HandHeart, title: 'Handle', desc: 'Hygienic processing & packing' },
  { icon: PackageCheck, title: 'Supply', desc: 'Cold chain maintained' },
  { icon: Truck, title: 'Deliver', desc: 'On-time to your doorstep' },
];

export const testimonials = [
  {
    quote:
      'Pariyani Aqua Pearl has been our reliable meat supplier for over a year. The quality is consistently excellent, and deliveries are always on time. Their bulk supply capability is exactly what our hotel needs.',
    name: 'Restaurant Owner',
    business: 'Hotel & Restaurant, Mumbai',
  },
  {
    quote:
      'The freshness of their fish and seafood is remarkable. We supply to multiple restaurants and Pariyani has never let us down on availability or quality. Highly recommended for B2B buyers.',
    name: 'Seafood Distributor',
    business: 'Distributor, Mumbai',
  },
  {
    quote:
      'As a caterer handling large events, we need bulk quantities at short notice. Pariyani Aqua Pearl consistently delivers on time, and their hygiene standards give us confidence in every order.',
    name: 'Catering Manager',
    business: 'Catering Service, Mumbai',
  },
  {
    quote:
      'Their egg supply is dependable and always fresh. We place bulk orders regularly for our canteen, and the pricing is very competitive. A trustworthy wholesale partner.',
    name: 'Facility Manager',
    business: 'Institutional Canteen, Mumbai',
  },
];

export const landingFAQs = [
  {
    question: 'How do I place a bulk order?',
    answer:
      'You can place a bulk order by adding products to your cart and proceeding to checkout, or by submitting an enquiry through our "Get a Quote" form. Our team will contact you to confirm details, quantities, and delivery arrangements.',
  },
  {
    question: 'Is stock always available for all products?',
    answer:
      'We maintain large stock capacity for all major product categories. However, seasonal items and specific varieties may have limited availability. We recommend contacting us for real-time stock confirmation before placing large orders.',
  },
  {
    question: 'Which areas do you supply to?',
    answer:
      'We supply across Mumbai and surrounding regions in Maharashtra. For specific delivery area confirmation, please contact us with your location details.',
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Minimum order quantities vary by product category. Please contact us or submit an enquiry for specific MOQ details for the products you need.',
  },
  {
    question: 'How does the quotation process work?',
    answer:
      'Submit an enquiry through our "Get a Quote" form with your requirements. Our team will review and send you a customized quote with bulk pricing, typically within 24 hours.',
  },
];

export function CategoryCard({
  to,
  image,
  title,
  desc,
}: {
  to: string;
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="card card-hover group relative block overflow-hidden"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-xl font-bold text-white">{title}</h3>
          <p className="mt-1.5 text-sm text-cream-200">{desc}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-colors group-hover:text-teal-300">
            View Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function StatBar() {
  const stats = [
    { value: '40+', label: 'Product Categories' },
    { value: '5,000+', label: 'Bulk Orders Fulfilled' },
    { value: '50+', label: 'Locations Served' },
    { value: '10+', label: 'Years of Experience' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl bg-navy-900 p-6 text-center text-white"
        >
          <p className="font-display text-3xl font-bold text-teal-400 lg:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-cream-300 lg:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white px-3 py-2">
      <Icon className="h-4 w-4 text-teal-600" />
      <span className="text-xs font-medium text-navy-700">{label}</span>
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  subtitle,
  center = true,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-navy-600 lg:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

export function TrustBadgesRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <TrustBadge icon={ShieldCheck} label="Hygienically Processed" />
      <TrustBadge icon={Snowflake} label="Cold Chain Maintained" />
      <TrustBadge icon={PackageCheck} label="Bulk Supply Ready" />
      <TrustBadge icon={MapPin} label="Mumbai Based" />
    </div>
  );
}
