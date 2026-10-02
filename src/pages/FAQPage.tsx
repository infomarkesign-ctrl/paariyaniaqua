import { Link } from '@/lib/router';
import PageHeader from '@/components/ui/PageHeader';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABanner from '@/components/ui/CTABanner';
import { ClipboardList, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I place a bulk order?',
      answer:
        'You can place a bulk order in two ways: (1) Add products to your cart on our website and proceed to checkout with Cash on Delivery, or (2) Submit an enquiry through our "Get a Quote" form with your requirements. Our team will contact you to confirm details, quantities, pricing, and delivery arrangements.',
    },
    {
      question: 'Is stock always available for all products?',
      answer:
        'We maintain large stock capacity for all major product categories. However, seasonal items (like hilsa fish), specific varieties, and certain specialty products may have limited availability. We recommend contacting us for real-time stock confirmation before placing large or time-sensitive orders.',
    },
    {
      question: 'Which areas do you supply to?',
      answer:
        'We currently supply across Mumbai and surrounding regions in Maharashtra, including Mumbai City, Mumbai Suburban, Navi Mumbai, Thane, and neighboring areas. If you\'re outside these areas, please contact us — we may be able to arrange delivery or connect you with a distributor in your region.',
    },
    {
      question: 'What is the minimum order quantity (MOQ)?',
      answer:
        'Minimum order quantities vary by product category and type. For specific MOQ details, please contact us or submit an enquiry with the products you\'re interested in. We\'ll provide you with the minimum quantities and bulk pricing information.',
    },
    {
      question: 'How does the quotation and pricing process work?',
      answer:
        'Submit an enquiry through our "Get a Quote" form or contact us by phone with your product requirements, quantities, and delivery area. Our team will review your requirements and send you a customized quote with bulk pricing, typically within 24 hours. Pricing is volume-based — larger orders receive more competitive rates.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept Cash on Delivery (COD) only. Payment is made in cash at the time of delivery. We do not accept UPI, credit/debit cards, net banking, or digital wallets. No advance payment is required — you pay when you receive your order.',
    },
    {
      question: 'What are the delivery timelines for bulk orders?',
      answer:
        'Bulk orders are typically delivered within 24-48 hours of order confirmation, subject to product availability and order volume. For regular procurement contracts, we set up scheduled deliveries (daily, weekly, or monthly) based on your requirements. Specific delivery timelines will be confirmed at the time of order placement.',
    },
    {
      question: 'What quality guarantees do you offer?',
      answer:
        'We maintain strict quality standards with multi-stage inspection from sourcing to delivery. Products are hygienically processed, stored with cold chain maintained, and quality-checked before dispatch. If you receive products that do not meet expected quality standards, please contact us immediately at the time of delivery for resolution.',
    },
    {
      question: 'What happens if I receive damaged or spoiled goods?',
      answer:
        'If you receive damaged, spoiled, or incorrect items, please report the issue at the time of delivery. We will arrange for replacement or adjustment as appropriate. Since our products are perishable, issues must be reported immediately upon delivery — we cannot accept complaints after goods have been accepted and stored.',
    },
    {
      question: 'Can I set up a regular supply contract?',
      answer:
        'Yes. We offer regular procurement contracts for businesses with ongoing supply needs. You can set up scheduled deliveries (daily, weekly, or monthly) with predetermined quantities and product mixes. Contact us to discuss your requirements and set up a supply agreement.',
    },
    {
      question: 'Do you provide customized cuts and packaging?',
      answer:
        'Yes, we offer customized cuts, packaging sizes, and product specifications based on your requirements. Whether you need specific meat cuts, particular fish cleaning styles, or specific egg crate sizes, let us know and we\'ll do our best to accommodate.',
    },
    {
      question: 'Can I get a GST invoice for my order?',
      answer:
        'Yes, we provide GST invoices for all orders. You can provide your GSTIN during checkout or inform us when placing your order, and we\'ll ensure a proper GST invoice is issued with your delivery.',
    },
  ];

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our wholesale supply, ordering process, delivery, payment, and quality policies."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqs} defaultOpen={0} />

            {/* Help block */}
            <div className="mt-12 rounded-2xl bg-cream-100 p-8 text-center">
              <ClipboardList className="mx-auto h-10 w-10 text-teal-600" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                Still Have Questions?
              </h3>
              <p className="mt-2 text-sm text-navy-600">
                Our team is ready to help with any questions about our products,
                pricing, or supply process.
              </p>
              <Link to="/contact" className="mt-5 btn-primary">
                Contact Us
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
