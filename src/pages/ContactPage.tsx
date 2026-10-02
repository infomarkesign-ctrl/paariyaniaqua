import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import EnquiryForm from '@/components/ui/EnquiryForm';
import { siteConfig, facilityImages } from '@/lib/site';
import { useContactInfo } from '@/hooks/useContactInfo';
import { MapPin, Phone, Mail, Clock, Building2, Banknote, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const { contactInfo, isLoading: isLoadingContact } = useContactInfo();
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeEmail, setDisputeEmail] = useState('');
  const [disputeSubject, setDisputeSubject] = useState('');
  const [disputeMessage, setDisputeMessage] = useState('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);
  const [disputeError, setDisputeError] = useState('');

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDispute(true);
    setDisputeError('');

    try {
      const res = await fetch('http://localhost:3002/api/contact/dispute', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: disputeEmail,
          subject: disputeSubject,
          message: disputeMessage,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit dispute');
      }

      setDisputeSubmitted(true);
      setDisputeEmail('');
      setDisputeSubject('');
      setDisputeMessage('');
      setTimeout(() => {
        setShowDisputeForm(false);
        setDisputeSubmitted(false);
      }, 3000);
    } catch (err) {
      setDisputeError(err instanceof Error ? err.message : 'Failed to submit dispute');
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch for bulk orders, quotations, or any questions about our wholesale supply. Our team will respond within 24 hours."
        breadcrumbs={[{ label: 'Contact Us' }]}
        bgImage={facilityImages.logistics}
      />

      <section className="py-16 lg:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <span className="section-label">Get a Quote</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Request a Quote or Enquiry
            </h2>
            <p className="mt-3 text-navy-600">
              Fill out the form below with your requirements and we'll get back
              to you with a customized quote within 24 hours.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                Contact Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Phone</p>
                    <p className="text-sm text-navy-600">{siteConfig.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                    <Mail className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Support Email</p>
                    <p className="text-sm text-navy-600">
                      {isLoadingContact ? '...' : contactInfo?.support || siteConfig.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-coral-50">
                    <AlertCircle className="h-5 w-5 text-coral-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Disputes & Issues</p>
                    <p className="text-sm text-navy-600">
                      {isLoadingContact ? '...' : contactInfo?.dispute || 'dispute@pariyaniaquapearl.store'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                    <Clock className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Business Hours</p>
                    <p className="text-sm text-navy-600">{siteConfig.contact.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                    <Banknote className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Payment</p>
                    <p className="text-sm text-navy-600">{siteConfig.payment}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Form */}
            {!showDisputeForm ? (
              <button
                onClick={() => setShowDisputeForm(true)}
                className="w-full p-4 border-2 border-coral-200 rounded-lg hover:bg-coral-50 transition text-left"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-coral-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900">Report a Dispute</p>
                    <p className="text-sm text-navy-600">Have an issue with your order? Let us know.</p>
                  </div>
                </div>
              </button>
            ) : (
              <div className="card p-6 border-2 border-coral-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-navy-900">Report a Dispute</h3>
                  <button
                    onClick={() => setShowDisputeForm(false)}
                    className="text-navy-400 hover:text-navy-900"
                  >
                    ✕
                  </button>
                </div>
                {disputeSubmitted ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-green-800">Dispute submitted successfully. We'll review it shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitDispute} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={disputeEmail}
                      onChange={(e) => setDisputeEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg focus:outline-none focus:border-coral-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Dispute subject"
                      value={disputeSubject}
                      onChange={(e) => setDisputeSubject(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg focus:outline-none focus:border-coral-500 text-sm"
                    />
                    <textarea
                      placeholder="Describe your issue..."
                      value={disputeMessage}
                      onChange={(e) => setDisputeMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg focus:outline-none focus:border-coral-500 text-sm"
                    />
                    {disputeError && <p className="text-sm text-red-600">{disputeError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmittingDispute}
                      className="w-full py-2 bg-coral-600 text-white rounded-lg font-medium hover:bg-coral-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmittingDispute ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Submit Dispute
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-coral-50">
                  <Building2 className="h-5 w-5 text-coral-600" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {siteConfig.legalName}
                  </h3>
                  <div className="mt-2 flex items-start gap-2 text-sm text-navy-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-coral-600" />
                    <span>{siteConfig.address.full}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-cream-200 shadow-card">
              <iframe
                title="Pariyani Aqua Pearl location — Pydhonie, Mumbai"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d72.8355!3d18.9555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU3JzE5LjgiTiA3MsKwDUEnMDcuOCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
