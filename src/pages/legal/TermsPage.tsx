import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/lib/site';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="The terms and conditions governing the use of our website and wholesale supply services."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-cream-200 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-teal-600" />
                <p className="text-sm text-navy-700">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-legal mt-8">
              <p>
                Welcome to the website of {siteConfig.legalName}. By accessing and
                using this website and our services, you agree to be bound by these
                Terms & Conditions. Please read them carefully.
              </p>

              <h3>1. Acceptance of Terms</h3>
              <p>
                By using our website, submitting enquiries, or placing orders, you
                acknowledge that you have read, understood, and agree to be bound
                by these Terms & Conditions and all applicable laws and regulations.
              </p>

              <h3>2. Eligibility — B2B Buyers</h3>
              <p>
                Our services are designed for business-to-business (B2B) transactions.
                You represent and warrant that you are an authorized representative
                of a business entity, purchasing products for business use and not
                for personal consumption. You must be at least 18 years of age to
                use this website.
              </p>

              <h3>3. Product Descriptions & Availability</h3>
              <p>
                We strive to provide accurate product descriptions, images, and
                information. However, product images are representative and may
                not exactly match the delivered product. Availability of all
                products is subject to stock and may change without notice.
                Seasonal items may have limited availability.
              </p>

              <h3>4. Pricing & Bulk Order Terms</h3>
              <p>
                All pricing displayed on our website is indicative and subject to
                change without notice. Bulk order pricing is quote-based and will
                be confirmed before order fulfilment. Prices may vary based on
                order volume, product availability, market conditions, and
                delivery location. A formal quote provided by our team is valid
                for the period stated in the quote.
              </p>

              <h3>5. Order Confirmation Process</h3>
              <p>
                Submitting an order through our website constitutes a request to
                purchase, not a confirmed order. Orders are confirmed only when
                our team contacts you to verify details, confirm pricing, and
                schedule delivery. We reserve the right to decline or cancel any
                order at our discretion.
              </p>

              <h3>6. Payment Terms — Cash on Delivery Only</h3>
              <p>
                Payment is accepted via Cash on Delivery (COD) only. Payment must
                be made in cash at the time of delivery. We do not accept UPI,
                credit cards, debit cards, net banking, digital wallets, or any
                other electronic payment methods. No advance payment is required.
              </p>

              <h3>7. Delivery Terms</h3>
              <p>
                Delivery is available within Mumbai and surrounding regions in
                Maharashtra. Delivery timelines for bulk orders are typically 24-48
                hours from order confirmation, subject to product availability and
                order volume. Delivery charges, if applicable, will be communicated
                at the time of order confirmation. Please refer to our Shipping
                Policy for detailed delivery information.
              </p>

              <h3>8. Cancellation Policy</h3>
              <p>
                Orders may be cancelled before they have been processed and
                dispatched. Once products have been processed and packed for
                delivery, cancellation is not possible. To cancel an order,
                contact us immediately with your order reference number.
              </p>

              <h3>9. Returns & Replacements</h3>
              <p>
                Due to the perishable nature of our products, returns are not
                accepted once goods have been accepted at delivery. If you receive
                damaged, spoiled, or incorrect items, you must report the issue
                at the time of delivery. We will arrange for replacement or
                adjustment as appropriate. Please refer to our Refund Policy for
                detailed information.
              </p>

              <h3>10. Liability Limitations</h3>
              <p>
                To the maximum extent permitted by law, {siteConfig.legalName} shall
                not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of our website or
                products. Our total liability for any claim shall not exceed the
                value of the products purchased in the relevant transaction.
              </p>

              <h3>11. Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos,
                images, and software, is the property of {siteConfig.legalName} or
                its content suppliers and is protected by intellectual property
                laws. You may not reproduce, distribute, or use any content without
                our prior written permission.
              </p>

              <h3>12. Governing Law</h3>
              <p>
                These Terms & Conditions are governed by the laws of India, with
                jurisdiction in the courts of Mumbai, Maharashtra. Any disputes
                arising from these terms or our services shall be subject to the
                exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>

              <h3>13. Dispute Resolution</h3>
              <p>
                Any disputes or claims arising from these Terms & Conditions or
                our services shall first be attempted to be resolved through
                good-faith negotiations between the parties. If resolution cannot
                be reached through negotiation, the dispute shall be referred to
                arbitration in Mumbai, Maharashtra, in accordance with the
                Arbitration and Conciliation Act, 1996.
              </p>

              <h3>14. Changes to Terms</h3>
              <p>
                We reserve the right to update or modify these Terms & Conditions
                at any time. Updated terms will be posted on this page with a
                revised "last updated" date. Continued use of our website after
                changes constitutes acceptance of the revised terms.
              </p>

              <h3>15. Contact</h3>
              <p>For any questions regarding these Terms & Conditions, please contact us:</p>
              <ul>
                <li><strong>Company:</strong> {siteConfig.legalName}</li>
                <li><strong>Address:</strong> {siteConfig.address.full}</li>
                <li><strong>Email:</strong> {siteConfig.contact.email}</li>
                <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
