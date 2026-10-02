import { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { navItems } from '@/lib/site';
import { searchProducts } from '@/lib/products';
import type { Product } from '@/types';
import Logo from '@/components/ui/Logo';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  TextQuote,
  Package,
  LogOut,
  User,
} from 'lucide-react';

export default function Header() {
  const { path, navigate } = useRouter();
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [path]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchProducts(searchQuery).then(setSearchResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const isActive = (itemPath: string) =>
    path === itemPath || (itemPath !== '/' && path.startsWith(itemPath));

  const isDropdownActive = (item: (typeof navItems)[number]) =>
    item.dropdown?.some((sub) => isActive(sub.path)) ?? false;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-nav backdrop-blur-md'
          : 'bg-white shadow-sm'
      }`}
    >
      {/* Top strip — slim, hidden on mobile */}
      <div className="hidden bg-navy-900 text-cream-100 lg:block">
        <div className="container-wide flex h-8 items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <Package className="h-3.5 w-3.5 text-teal-400" />
            B2B Wholesale Supplier — Meat, Fish & Eggs
          </span>
          <span className="flex items-center gap-4">
            <span className="text-cream-300">Cash on Delivery available</span>
            <span className="h-3 w-px bg-navy-600" />
            <span className="text-cream-300">Mumbai, Maharashtra</span>
          </span>
        </div>
      </div>

      {/* Main nav — slimmer height */}
      <div className="container-wide flex h-14 items-center justify-between gap-4 lg:h-16">
        {/* Logo — far left */}
        <Logo />

        {/* Desktop nav — centered group with even spacing */}
        <nav
          ref={navRef}
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={scheduleClose}
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            const dropdownActive = isDropdownActive(item);
            const isOpen = openDropdown === item.label;

            if (!item.dropdown) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-teal-600'
                      : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-500" />
                  )}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
              >
                <button
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === item.label ? null : item.label))
                  }
                  className={`relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active || dropdownActive
                      ? 'text-teal-600'
                      : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {(active || dropdownActive) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-500" />
                  )}
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-full pt-3"
                    onMouseEnter={openMenu.bind(null, item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="w-60 overflow-hidden rounded-xl border border-cream-200 bg-white py-1.5 shadow-card-hover animate-scale-in">
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            i === 0
                              ? 'font-semibold text-navy-900 hover:bg-cream-50'
                              : isActive(sub.path)
                                ? 'bg-teal-50 font-medium text-teal-600'
                                : 'text-navy-700 hover:bg-cream-50 hover:text-teal-600'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right actions — grouped far right */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-50"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-full z-50 w-80 pt-2 sm:w-96">
                <div className="overflow-hidden rounded-xl border border-cream-200 bg-white shadow-card-hover animate-scale-in">
                  <form onSubmit={handleSearchSubmit} className="p-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-cream-300 bg-cream-50 py-2.5 pl-9 pr-3 text-sm focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                    </div>
                  </form>
                  {searchResults.length > 0 && (
                    <div className="max-h-72 overflow-y-auto border-t border-cream-100">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-cream-50"
                        >
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-navy-900">
                              {product.name}
                            </p>
                            <p className="truncate text-xs text-navy-500">
                              {product.sub_type}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                    <div className="border-t border-cream-100 px-4 py-6 text-center text-sm text-navy-500">
                      No products found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-50"
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral-500 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-xs text-navy-600 sm:text-sm">
                  {user.identifier}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-navy-700 transition-colors hover:bg-navy-50 sm:text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary hidden h-9 px-4 py-0 text-xs sm:inline-flex lg:text-sm"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
          )}

          <Link
            to="/contact"
            className="btn-primary hidden h-9 px-4 py-0 text-xs sm:inline-flex lg:text-sm"
          >
            <TextQuote className="h-4 w-4" />
            Get a Quote
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-cream-200 bg-white lg:hidden">
          <nav className="container-wide max-h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <MobileDropdown
                    key={item.label}
                    item={item}
                    isActive={isActive}
                    onNavigate={() => setMobileOpen(false)}
                  />
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-navy-700 hover:bg-cream-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 space-y-2 px-4">
              {user ? (
                <>
                  <div className="rounded-lg bg-teal-50 p-3 text-sm">
                    <p className="text-xs text-navy-600">Logged in as:</p>
                    <p className="font-medium text-navy-900">{user.identifier}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-coral-100 px-4 py-2 text-sm font-medium text-coral-700 transition-colors hover:bg-coral-200"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full flex justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Login / Sign Up
                </Link>
              )}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                <TextQuote className="h-4 w-4" />
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileDropdown({
  item,
  isActive,
  onNavigate,
}: {
  item: (typeof navItems)[number];
  isActive: (path: string) => boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex flex-1 items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-navy-700 hover:bg-cream-50"
        >
          {item.label}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
      {expanded && (
        <div className="ml-4 border-l border-cream-200">
          {item.dropdown!.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              onClick={onNavigate}
              className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                isActive(sub.path)
                  ? 'bg-teal-50 font-medium text-teal-600'
                  : 'text-navy-600 hover:bg-cream-50'
              }`}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
