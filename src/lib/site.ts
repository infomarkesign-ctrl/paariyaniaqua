export const siteConfig = {
  name: 'Pariyani Aqua Pearl',
  legalName: 'Pariyani Aqua Pearl Private Limited',
  tagline: 'Your Trusted Wholesale Partner for Meat, Fish & Eggs',
  address: {
    line1: '7th Floor, Building No./Flat No. 29, 706, "Rapid Heights,"',
    line2: 'Kolsa Street, Near Pydhonie, Pydhonie,',
    city: 'Mumbai, Mumbai District, Maharashtra',
    pincode: '400003',
    full: '7th Floor, Building No./Flat No. 29, 706, "Rapid Heights," Kolsa Street, Near Pydhonie, Pydhonie, Mumbai, Mumbai District, Maharashtra – 400003',
  },
  contact: {
    phone: '+91 96531 11297',
    phoneHref: 'tel:+919653111297',
    email: 'support@pariyaniaquapearl.store',
    hours: 'Mon – Sat: 8:00 AM – 8:00 PM',
  },
  payment: 'Cash on Delivery (COD) only',
  fssai: '[FSSAI License No. — to be confirmed by client]',
  stats: {
    categories: '40+',
    ordersFulfilled: '5,000+',
    locationsServed: '50+',
    yearsExperience: '10+',
  },
};

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Products',
    path: '/products',
    dropdown: [
      { label: 'All Products', path: '/products' },
      { label: 'Meat Products', path: '/products/meat' },
      { label: 'Fish & Seafood', path: '/products/fish-seafood' },
      { label: 'Egg Products', path: '/products/eggs' },
    ],
  },
  {
    label: 'Wholesale',
    path: '/wholesale-solutions',
    dropdown: [
      { label: 'Wholesale Solutions', path: '/wholesale-solutions' },
      { label: 'Quality & Food Safety', path: '/quality-food-safety' },
      { label: 'Sourcing & Supply', path: '/sourcing-supply' },
      { label: 'Why Choose Us', path: '/why-choose-us' },
      { label: 'Industries We Serve', path: '/industries' },
    ],
  },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

export const footerQuickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Products', path: '/products' },
  { label: 'Wholesale Solutions', path: '/wholesale-solutions' },
  { label: 'Why Choose Us', path: '/why-choose-us' },
  { label: 'Contact Us', path: '/contact' },
];

export const footerProductLinks = [
  { label: 'Meat Products', path: '/products/meat' },
  { label: 'Fish & Seafood', path: '/products/fish-seafood' },
  { label: 'Egg Products', path: '/products/eggs' },
  { label: 'Industries We Serve', path: '/industries' },
];

export const footerLegalLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-conditions' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'Disclaimer', path: '/disclaimer' },
];

export const heroImages = {
  meat: 'https://images.pexels.com/photos/31120516/pexels-photo-31120516.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  fish: 'https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  eggs: 'https://images.pexels.com/photos/38912506/pexels-photo-38912506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  coldStorage: 'https://images.pexels.com/photos/4487382/pexels-photo-4487382.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
};

export const facilityImages = {
  processing: 'https://images.pexels.com/photos/5953801/pexels-photo-5953801.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
  coldStorage: 'https://images.pexels.com/photos/35877059/pexels-photo-35877059.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
  logistics: 'https://images.pexels.com/photos/27099094/pexels-photo-27099094.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
  warehouse: 'https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
  quality: 'https://images.pexels.com/photos/5953796/pexels-photo-5953796.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
  kitchen: 'https://images.pexels.com/photos/2544830/pexels-photo-2544830.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop',
};
