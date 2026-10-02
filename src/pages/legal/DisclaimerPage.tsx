import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/lib/site';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        title="Disclaimer"
        subtitle="Important disclaimers regarding product information, pricing, availability, and content on our website."
        breadcrumbs={[{ label: 'Disclaimer' }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-cream-200 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-teal-600" />
                <p className="text-sm text-navy-700">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-legal mt-8">
              <p>
                The information provided on this website by {siteConfig.legalName}
                is for general informational purposes only. By using this website,
                you acknowledge and accept the disclaimers outlined below.
              </p>

              <h3>1. Product Images</h3>
              <p>
                All product images displayed on this website are representative and
                illustrative. They are intended to give you a general idea of the
                product appearance. Actual products may vary in size, shape, color,
                cut, and presentation. Product images should not be considered
                exact representations of the products you will receive. We make no
                guarantees that product images will exactly match delivered products.
              </p>

              <h3>2. Pricing</h3>
              <p>
                All pricing displayed on this website is indicative and provided for
                general information. Prices are subject to change without prior
                notice. Bulk order pricing is quote-based and is confirmed
                individually for each order based on product type, quantity,
                delivery location, and market conditions. The price confirmed by
                our team in a formal quote is the final price applicable to your
                order.
              </p>

              <h3>3. Product Availability</h3>
              <p>
                Product availability is subject to stock levels, seasonal factors,
                and supply conditions. Products listed on this website may not
                always be in stock. We reserve the right to limit quantities or
                discontinue products without prior notice. For time-sensitive or
                large orders, please contact us to confirm availability before
                placing your order.
              </p>

              <h3>4. Third-Party Delays</h3>
              <p>
                {siteConfig.legalName} is not liable for delays caused by third-party
                logistics providers, transportation partners, or any other external
                parties beyond our reasonable control. While we work with reliable
                partners and strive to deliver on time, we cannot guarantee delivery
                times that are dependent on third-party services. We will make every
                reasonable effort to communicate any delays promptly.
              </p>

              <h3>5. Content Accuracy</h3>
              <p>
                We make every effort to ensure the information on this website is
                accurate and up-to-date. However, we do not warrant or make any
                representations regarding the accuracy, reliability, completeness,
                or timeliness of any content on this website. Product descriptions,
                specifications, and other details are provided in good faith but
                may contain errors or omissions. We reserve the right to correct
                any errors or update information at any time without notice.
              </p>

              <h3>6. External Links</h3>
              <p>
                This website may contain links to external websites that are not
                operated by us. We have no control over the content and practices
                of these third-party sites and accept no responsibility for them or
                for any loss or damage that may arise from your use of them. The
                inclusion of any links does not necessarily imply endorsement or
                recommendation by us.
              </p>

              <h3>7. No Professional Advice</h3>
              <p>
                The content on this website does not constitute professional food
                safety, legal, or business advice. For specific guidance regarding
                food handling, storage, or regulatory compliance, please consult
                appropriate professionals or regulatory authorities.
              </p>

              <h3>8. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by applicable law, {siteConfig.legalName}
                shall not be liable for any direct, indirect, incidental,
                consequential, or punitive damages arising from your use of or
                reliance on any content on this website. Your use of this website
                is at your own risk.
              </p>

              <h3>9. Changes to This Disclaimer</h3>
              <p>
                We reserve the right to update or modify this Disclaimer at any
                time. Changes will be posted on this page with a revised "last
                updated" date. Continued use of our website after any changes
                constitutes acceptance of the revised disclaimer.
              </p>

              <h3>10. Contact</h3>
              <p>For any questions about this Disclaimer, please contact us:</p>
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
