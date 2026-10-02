import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, Loader2, Check, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';

type Step = 'method' | 'identifier' | 'otp' | 'success';
type Channel = 'email' | 'phone' | null;

export default function LoginPage() {
  const { navigate } = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>('method');
  const [channel, setChannel] = useState<Channel>(null);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);
  const [resendIn, setResendIn] = useState(0);
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!channel || !identifier) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3002/api/auth/send-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ channel, identifier }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setExpiresIn(data.expiresIn);
      setResendIn(data.resendIn);
      setStep('otp');

      let countdown = data.expiresIn;
      const interval = setInterval(() => {
        countdown--;
        setExpiresIn(countdown);
        if (countdown <= 0) clearInterval(interval);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!channel || !identifier || !otp) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3002/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ channel, identifier, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');

      login(data.token, data.user);
      setStep('success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendIn(0);
    await handleSendOtp();
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-teal-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Success State */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center animate-scale-in">
                  <Check className="w-10 h-10 text-teal-600" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-navy-900">Welcome!</h2>
                <p className="mt-2 text-navy-600">You've successfully signed in</p>
              </div>
              <div className="pt-4 text-sm text-navy-500">Redirecting to home...</div>
            </div>
          )}

          {/* Method Selection */}
          {step === 'method' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <h1 className="font-display text-4xl font-bold text-navy-900">Welcome Back</h1>
                <p className="text-navy-600">Sign in to your Pariyani Aqua Pearl account</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setChannel('email');
                    setStep('identifier');
                    setError('');
                  }}
                  className="w-full group relative overflow-hidden rounded-xl border-2 border-cream-200 bg-white p-5 transition-all hover:border-teal-500 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 group-hover:bg-teal-200 transition">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-navy-900">Email</p>
                      <p className="text-sm text-navy-500">Receive OTP on your email</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setChannel('phone');
                    setStep('identifier');
                    setError('');
                  }}
                  className="w-full group relative overflow-hidden rounded-xl border-2 border-cream-200 bg-white p-5 transition-all hover:border-teal-500 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 group-hover:bg-teal-200 transition">
                      <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-navy-900">Phone</p>
                      <p className="text-sm text-navy-500">Receive OTP via SMS</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="border-t border-cream-200 pt-6">
                <p className="text-center text-sm text-navy-600">
                  New customer?{' '}
                  <button
                    onClick={() => navigate('/contact')}
                    className="font-semibold text-teal-600 hover:text-teal-700 transition"
                  >
                    Contact us for wholesale
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Identifier Input */}
          {step === 'identifier' && (
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => {
                  setStep('method');
                  setError('');
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Change method
              </button>

              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  Enter your {channel === 'email' ? 'email' : 'phone number'}
                </h2>
                <p className="text-sm text-navy-600">We'll send you a verification code</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    {channel === 'email' ? 'Email address' : 'Phone number'}
                  </label>
                  <input
                    type={channel === 'email' ? 'email' : 'tel'}
                    placeholder={channel === 'email' ? 'you@example.com' : '+91 98765 43210'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-cream-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition text-navy-900"
                  />
                  {identifier && (
                    <p className="mt-2 text-xs text-navy-500">
                      {channel === 'email'
                        ? isValidEmail(identifier)
                          ? '✓ Valid email'
                          : '✗ Invalid email format'
                        : isValidPhone(identifier)
                          ? '✓ Valid phone number'
                          : '✗ Please enter 10-digit number'}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={
                    isLoading ||
                    !identifier ||
                    (channel === 'email' ? !isValidEmail(identifier) : !isValidPhone(identifier))
                  }
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  Send verification code
                </button>
              </div>
            </div>
          )}

          {/* OTP Input */}
          {step === 'otp' && (
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => {
                  setStep('identifier');
                  setError('');
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-navy-900">Enter verification code</h2>
                <p className="text-sm text-navy-600">
                  We sent a code to{' '}
                  <span className="font-medium text-navy-900">
                    {channel === 'email' ? identifier : `+91 ${identifier.slice(-10)}`}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-navy-700 mb-2">Verification code</label>
                  <div className="relative">
                    <input
                      type={showOtp ? 'text' : 'password'}
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="w-full px-4 py-3 text-center text-3xl tracking-widest font-semibold border-2 border-cream-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition text-navy-900 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-3 top-11 text-navy-400 hover:text-navy-600"
                    >
                      {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <span className="text-sm text-teal-700">Code expires in</span>
                  <span className="font-mono font-bold text-teal-900">
                    {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, '0')}
                  </span>
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  Verify & Sign in
                </button>

                <button
                  onClick={handleResendOtp}
                  disabled={resendIn > 0 || isLoading}
                  className="w-full py-2 text-teal-600 hover:text-teal-700 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-medium transition"
                >
                  {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy-900 text-cream-100 py-4 text-center text-sm">
        <p>
          🔒 Secure login •{' '}
          <span className="text-teal-400">Cash on Delivery</span>
          {' '}• Mumbai Wholesale Supplier
        </p>
      </div>
    </div>
  );
}
