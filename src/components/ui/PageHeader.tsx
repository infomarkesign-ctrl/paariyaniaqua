import type { ReactNode } from 'react';
import { Link } from '@/lib/router';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  bgImage,
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/85 to-navy-800/70" />
        </>
      )}
      <div className="container-wide relative z-10 py-14 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-cream-300">
            <Link to="/" className="flex items-center gap-1 hover:text-teal-400">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-navy-500" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-teal-400">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-cream-100">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-cream-300 lg:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
