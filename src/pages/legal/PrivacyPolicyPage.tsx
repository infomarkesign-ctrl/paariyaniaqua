import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/lib/site';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How Pariyani Aqua Pearl Private Limited collects, uses, and protects your information."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-cream-200 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <p className="text-sm text-navy-700">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-legal mt-8">
              <p>
                {siteConfig.legalName} ("we", "us", or "our") respects your privacy
                and is committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, store, and share your information
                when you use our website or engage our services.
              </p>

              <h3>1. Information We Collect</h3>
              <p>We collect the following types of information when you interact with our website or services:</p>
              <ul>
                <li><strong>Contact Information:</strong> Your name, company name, phone number, email address, and delivery address when you submit an enquiry or place an order.</li>
                <li><strong>Order Details:</strong> Product selections, quantities, packaging preferences, delivery instructions, and GSTIN (if provided).</li>
                <li><strong>Business Information:</strong> Business name, contact person details, and GSTIN for B2B transactions.</li>
                <li><strong>Usage Data:</strong> Basic information about how you use our website, including pages visited and general device information.</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>To process and fulfil your bulk orders and enquiries.</li>
                <li>To communicate with you about your orders, quotes, and deliveries.</li>
                <li>To provide customer support and respond to your questions.</li>
                <li>To send you relevant business communications (only with your consent).</li>
                <li>To maintain business records as required by applicable laws and regulations.</li>
                <li>To improve our website, products, and services.</li>
              </ul>

              <h3>3. Cookies</h3>
              <p>
                Our website uses essential cookies to function properly, such as
                maintaining your shopping cart between visits. We do not use
                advertising or tracking cookies. You can control cookies through
                your browser settings, but disabling them may affect website
                functionality.
              </p>

              <h3>4. Data Storage & Security</h3>
              <p>
                Your information is stored securely using industry-standard
                encryption and access controls. We limit access to your personal
                information to authorized personnel who need it to fulfil orders
                and provide services. While we strive to protect your information,
                no method of transmission over the internet is 100% secure.
              </p>

              <h3>5. Third-Party Sharing</h3>
              <p>
                We do not sell or rent your personal information to third parties.
                We share information only with the following parties as necessary
                for our operations:
              </p>
              <ul>
                <li><strong>Logistics Partners:</strong> Delivery address and contact details for order delivery.</li>
                <li><strong>Service Providers:</strong> Technology providers that help us operate our website and store data securely.</li>
                <li><strong>Regulatory Authorities:</strong> When required by law, court order, or government regulation.</li>
              </ul>

              <h3>6. Your Rights</h3>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements.</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
              </ul>
              <p>To exercise any of these rights, please contact us using the details below.</p>

              <h3>7. Data Retention</h3>
              <p>
                We retain your personal information for as long as necessary to
                fulfil the purposes described in this policy, including for legal,
                accounting, or reporting requirements. Order records are typically
                retained for a minimum period as required by tax and business
                regulations in India.
              </p>

              <h3>8. Policy Updates</h3>
              <p>
                We may update this Privacy Policy from time to time. We will post
                the updated policy on this page with a revised "last updated" date.
                We encourage you to review this policy periodically.
              </p>

              <h3>9. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy or how we handle
                your personal information, please contact us:
              </p>
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
