import { Link } from '@/lib/router';
import Logo from '@/components/ui/Logo';
import {
  siteConfig,
  footerQuickLinks,
  footerProductLinks,
  footerLegalLinks,
} from '@/lib/site';
import { MapPin, Phone, Mail, Clock, TextQuote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-200">
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 — Company */}
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-cream-300">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-xs text-navy-400">
              {siteConfig.legalName}
            </p>
            <div className="mt-4 flex items-start gap-2 text-xs text-cream-400">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
              <span className="leading-relaxed">{siteConfig.address.full}</span>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-100">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-300 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Product Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-100">
              Product Categories
            </h3>
            <ul className="space-y-2.5">
              {footerProductLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-300 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-100">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLegalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-300 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-100">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-teal-500" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-teal-500" />
                <span className="break-all">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500"
            >
              <TextQuote className="h-4 w-4" />
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-wide py-5">
          <p className="text-center text-xs text-navy-400">
            © {new Date().getFullYear()} {siteConfig.legalName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
