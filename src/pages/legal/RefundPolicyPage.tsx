import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/lib/site';
import { RotateCcw } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        title="Refund Policy"
        subtitle="Our policy for replacements and refunds for damaged, spoiled, or incorrect items."
        breadcrumbs={[{ label: 'Refund Policy' }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-cream-200 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-teal-600" />
                <p className="text-sm text-navy-700">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-legal mt-8">
              <p>
                At {siteConfig.legalName}, we are committed to delivering fresh,
                high-quality products. This Refund Policy explains the conditions
                under which replacements or refunds are provided. Since our products
                are perishable food items, this policy is designed to be fair to
                both our customers and our business.
              </p>

              <h3>1. When Refunds or Replacements Apply</h3>
              <p>Refunds or replacements are provided in the following circumstances:</p>
              <ul>
                <li><strong>Damaged Products:</strong> Products that are visibly damaged upon delivery.</li>
                <li><strong>Spoiled Products:</strong> Products that show signs of spoilage at the time of delivery.</li>
                <li><strong>Incorrect Items:</strong> Products delivered that do not match your confirmed order.</li>
                <li><strong>Quality Issues:</strong> Products that clearly do not meet the quality standards described at the time of ordering.</li>
              </ul>

              <h3>2. Non-Returnable Nature of Perishable Goods</h3>
              <p>
                Our products — meat, fish & seafood, and eggs — are perishable food
                items. Once goods have been accepted at the time of delivery and
                taken into your possession, they cannot be returned. This is due
                to food safety and hygiene regulations that prevent the resale of
                perishable goods once they have left our controlled cold chain
                environment.
              </p>

              <h3>3. Timeframe to Report Issues</h3>
              <p>
                <strong>Issues must be reported at the time of delivery.</strong> Our
                delivery personnel will wait while you inspect the products. If any
                product is damaged, spoiled, or incorrect, you must inform the
                delivery person immediately before accepting the order. Issues
                reported after the delivery person has left cannot be accepted,
                as we cannot verify the condition of the products after they have
                left our cold chain.
              </p>

              <h3>4. Replacement vs. Refund Process</h3>
              <p>When a valid issue is reported at the time of delivery, the following process applies:</p>
              <ul>
                <li><strong>Replacement:</strong> For damaged, spoiled, or incorrect items, we will arrange a replacement delivery as soon as possible, typically within 24 hours, at no additional cost to you.</li>
                <li><strong>Order Adjustment:</strong> If a replacement is not feasible (e.g., the product is out of stock), the value of the affected items will be deducted from your Cash on Delivery amount, or a refund will be arranged.</li>
                <li><strong>Refund Transfer:</strong> For items that have been prepaid (if applicable) or where the COD amount has already been adjusted, refunds will be transferred to your bank account within 7-10 business days.</li>
              </ul>

              <h3>5. Refund Method</h3>
              <p>
                Since payment is Cash on Delivery only, most issues are resolved
                through replacement or by adjusting the cash amount due at delivery.
                In cases where a separate refund is required (e.g., an overpayment
                or a cancelled order after partial payment), the refund will be
                processed via bank transfer to your account within 7-10 business
                days. No cash refunds are issued at the point of delivery beyond
                adjusting the COD amount.
              </p>

              <h3>6. How to Request a Refund or Replacement</h3>
              <p>
                To request a replacement or refund, follow these steps:
              </p>
              <ul>
                <li><strong>At Delivery:</strong> Report the issue to the delivery person immediately upon receiving the products.</li>
                <li><strong>By Phone:</strong> Call us at {siteConfig.contact.phone} at the time of delivery if the delivery person is unavailable.</li>
                <li><strong>Provide Details:</strong> Provide your order reference number, the affected product name, and a description of the issue.</li>
              </ul>

              <h3>7. Exclusions</h3>
              <p>The following situations are not eligible for refunds or replacements:</p>
              <ul>
                <li>Products that have been accepted and stored by the customer after delivery.</li>
                <li>Issues reported after the delivery person has left the premises.</li>
                <li>Products that have been improperly stored by the customer after delivery.</li>
                <li>Minor variations in product appearance that do not affect quality or safety.</li>
                <li>Orders cancelled after products have been processed and dispatched.</li>
              </ul>

              <h3>8. Contact for Refund Queries</h3>
              <p>For any questions about our Refund Policy or to follow up on a replacement or refund request:</p>
              <ul>
                <li><strong>Company:</strong> {siteConfig.legalName}</li>
                <li><strong>Address:</strong> {siteConfig.address.full}</li>
                <li><strong>Email:</strong> {siteConfig.contact.email}</li>
                <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
                <li><strong>Business Hours:</strong> {siteConfig.contact.hours}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
