import { useMemo } from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import AboutPage from '@/pages/AboutPage';
import ProductsOverviewPage from '@/pages/ProductsOverviewPage';
import CategoryListingPage from '@/pages/CategoryListingPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import WholesalePage from '@/pages/WholesalePage';
import QualityPage from '@/pages/QualityPage';
import SourcingPage from '@/pages/SourcingPage';
import WhyChooseUsPage from '@/pages/WhyChooseUsPage';
import IndustriesPage from '@/pages/IndustriesPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPolicyPage from '@/pages/legal/PrivacyPolicyPage';
import TermsPage from '@/pages/legal/TermsPage';
import RefundPolicyPage from '@/pages/legal/RefundPolicyPage';
import ShippingPolicyPage from '@/pages/legal/ShippingPolicyPage';
import DisclaimerPage from '@/pages/legal/DisclaimerPage';

function Routes() {
  const { path } = useRouter();

  const rendered = useMemo(() => {
    const cleanPath = path.split('?')[0];

    if (cleanPath === '/' || cleanPath === '') return <HomePage />;
    if (cleanPath === '/about') return <AboutPage />;
    if (cleanPath === '/products') return <ProductsOverviewPage />;
    if (cleanPath === '/products/meat') return <CategoryListingPage slug="meat" />;
    if (cleanPath === '/products/fish-seafood') return <CategoryListingPage slug="fish-seafood" />;
    if (cleanPath === '/products/eggs') return <CategoryListingPage slug="eggs" />;
    if (cleanPath.startsWith('/product/')) {
      const id = cleanPath.replace('/product/', '');
      return <ProductDetailPage id={id} />;
    }
    if (cleanPath === '/wholesale-solutions') return <WholesalePage />;
    if (cleanPath === '/quality-food-safety') return <QualityPage />;
    if (cleanPath === '/sourcing-supply') return <SourcingPage />;
    if (cleanPath === '/why-choose-us') return <WhyChooseUsPage />;
    if (cleanPath === '/industries') return <IndustriesPage />;
    if (cleanPath === '/faq') return <FAQPage />;
    if (cleanPath === '/contact') return <ContactPage />;
    if (cleanPath === '/login') return <LoginPage />;
    if (cleanPath === '/cart') return <CartPage />;
    if (cleanPath === '/checkout') return <CheckoutPage />;
    if (cleanPath.startsWith('/search')) {
      const queryMatch = path.match(/[?&]q=([^&]+)/);
      const query = queryMatch ? decodeURIComponent(queryMatch[1]) : '';
      return <SearchPage query={query} />;
    }
    if (cleanPath === '/privacy-policy') return <PrivacyPolicyPage />;
    if (cleanPath === '/terms-conditions') return <TermsPage />;
    if (cleanPath === '/refund-policy') return <RefundPolicyPage />;
    if (cleanPath === '/shipping-policy') return <ShippingPolicyPage />;
    if (cleanPath === '/disclaimer') return <DisclaimerPage />;

    return <NotFoundPage />;
  }, [path]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{rendered}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
