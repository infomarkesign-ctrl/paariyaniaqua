import { Link } from '@/lib/router';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container-x py-24 lg:py-32 text-center">
      <p className="font-display text-7xl font-bold text-cream-300">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-navy-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6 btn-primary">
        <Home className="h-4 w-4" />
        Back to Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
