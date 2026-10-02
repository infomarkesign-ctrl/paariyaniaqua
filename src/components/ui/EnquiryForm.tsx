import { useState, useEffect } from 'react';
import type { EnquiryFormData } from '@/types';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function EnquiryForm({
  productId,
  productName,
  compact = false,
}: {
  productId?: string | null;
  productName?: string;
  compact?: boolean;
}) {
  const [form, setForm] = useState<EnquiryFormData>({
    product_id: productId || null,
    name: '',
    company: '',
    phone: '',
    email: '',
    message: productName ? `I would like to enquire about ${productName}.` : '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (productName && !form.message) {
      setForm((f) => ({
        ...f,
        message: `I would like to enquire about ${productName}.`,
        product_id: productId || null,
      }));
    }
  }, [productName, productId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name and phone number.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    setStatus('success');
    setForm({
      product_id: productId || null,
      name: '',
      company: '',
      phone: '',
      email: '',
      message: '',
    });
  };

  if (status === 'success') {
    return (
      <div
        className={`rounded-xl border border-teal-200 bg-teal-50 p-6 text-center ${
          compact ? '' : 'py-12'
        }`}
      >
        <CheckCircle className="mx-auto h-12 w-12 text-teal-600" />
        <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
          Enquiry Submitted!
        </h3>
        <p className="mt-2 text-sm text-navy-600">
          Thank you for your interest. Our team will contact you shortly to discuss
          your requirements and provide a quote.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-teal-600 hover:text-teal-700"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Name <span className="text-coral-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Company Name
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="input-field"
            placeholder="Your business name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Phone <span className="text-coral-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            placeholder="you@business.com"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-700">
          Message / Requirement
        </label>
        <textarea
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-field resize-none"
          placeholder="Tell us about your bulk requirements, quantities, delivery area..."
        />
      </div>

      {status === 'error' && (
        <div className="rounded-lg border border-coral-200 bg-coral-50 px-4 py-3 text-sm text-coral-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Enquiry
          </>
        )}
      </button>
    </form>
  );
}
