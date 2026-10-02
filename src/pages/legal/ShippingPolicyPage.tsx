import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/lib/site';
import { Truck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHeader
        title="Shipping Policy"
        subtitle="Delivery areas, timelines, packaging standards, and shipping information for our wholesale orders."
        breadcrumbs={[{ label: 'Shipping Policy' }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-cream-200 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-teal-600" />
                <p className="text-sm text-navy-700">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-legal mt-8">
              <p>
                This Shipping Policy outlines the delivery terms, timelines, and
                packaging standards for all wholesale orders placed with
                {siteConfig.legalName}.
              </p>

              <h3>1. Delivery Areas Covered</h3>
              <p>
                We currently deliver to Mumbai and surrounding regions in
                Maharashtra, including but not limited to:
              </p>
              <ul>
                <li>Mumbai City and Mumbai Suburban districts</li>
                <li>Navi Mumbai</li>
                <li>Thane</li>
                <li>South Mumbai (Pydhonie and surrounding areas)</li>
                <li>Western and Eastern suburbs of Mumbai</li>
              </ul>
              <p>
                If your delivery location is outside these areas, please contact
                us to confirm whether delivery can be arranged.
              </p>

              <h3>2. Delivery Timelines</h3>
              <p>
                Delivery timelines for bulk and wholesale orders are as follows:
              </p>
              <ul>
                <li><strong>Standard Bulk Orders:</strong> Within 24-48 hours of order confirmation, subject to product availability.</li>
                <li><strong>Regular Procurement Contracts:</strong> Scheduled deliveries (daily, weekly, or monthly) as agreed in the supply contract.</li>
                <li><strong>Large-Volume Orders:</strong> May require additional preparation time, typically 48-72 hours. Exact timelines will be confirmed at order placement.</li>
                <li><strong>Seasonal Items:</strong> Subject to availability; timelines will be communicated at the time of order.</li>
              </ul>

              <h3>3. Packaging Standards</h3>
              <p>
                All products are packed to maintain quality, freshness, and food
                safety during transport:
              </p>
              <ul>
                <li><strong>Cold Chain Packaging:</strong> Products are packed in temperature-appropriate packaging with ice packs or insulated containers as needed to maintain the cold chain.</li>
                <li><strong>Hygienic Packaging:</strong> All packaging materials are food-grade and handled in sanitized conditions.</li>
                <li><strong>Bulk Packaging:</strong> Products are packed in the packaging size selected at order time (e.g., 1kg, 5kg, bulk crates).</li>
                <li><strong>Labeling:</strong> Each package is labeled with product name, quantity, and packaging date.</li>
              </ul>

              <h3>4. Delivery Charges</h3>
              <p>
                Delivery charges for bulk orders, if applicable, will be
                communicated at the time of order confirmation. Charges may vary
                based on delivery location, order volume, and product type. For
                regular procurement contract customers, delivery charges may be
                included in the agreed pricing structure.
              </p>

              <h3>5. Order Tracking</h3>
              <p>
                Once your order is confirmed and dispatched, our team will contact
                you with the expected delivery time. For real-time updates on your
                delivery, you can contact us directly using the contact details
                provided in your order confirmation.
              </p>

              <h3>6. Delayed Delivery</h3>
              <p>
                While we strive to deliver within the stated timelines, delays may
                occur due to circumstances beyond our control, including:
              </p>
              <ul>
                <li>Severe weather conditions</li>
                <li>Traffic congestion or road closures</li>
                <li>Unforeseen supply chain disruptions</li>
                <li>Force majeure events</li>
              </ul>
              <p>
                In the event of a delay, our team will contact you to inform you
                of the revised delivery time. We are not liable for delays caused
                by third-party logistics providers or circumstances beyond our
                reasonable control.
              </p>

              <h3>7. Receiving Your Delivery</h3>
              <p>
                Please ensure someone is available at the delivery address to
                receive the order. Upon delivery:
              </p>
              <ul>
                <li>Inspect all products before accepting the delivery.</li>
                <li>Report any damaged, spoiled, or incorrect items immediately to the delivery person.</li>
                <li>Transfer products to appropriate refrigerated or frozen storage immediately upon receipt.</li>
                <li>Make cash payment (Cash on Delivery) as confirmed at order placement.</li>
              </ul>

              <h3>8. Contact for Shipping Queries</h3>
              <p>For any questions about delivery, shipping, or to track an order:</p>
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
