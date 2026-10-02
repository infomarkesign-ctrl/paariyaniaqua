/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy — primary brand color
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#6f8ca8',
          500: '#5b7593',
          600: '#475c78',
          700: '#364659',
          800: '#1e2d42',
          900: '#102030',
          950: '#0a1622',
        },
        // Fresh teal — secondary/accent
        teal: {
          50: '#edf8f8',
          100: '#d2efee',
          200: '#a5dedd',
          300: '#6cc7c6',
          400: '#3aaaa8',
          500: '#1e8f8d',
          600: '#177575',
          700: '#155f5f',
          800: '#154d4d',
          900: '#134040',
          950: '#0a2626',
        },
        // Coral red — accent for meat/fish branding
        coral: {
          50: '#fef2f0',
          100: '#fde4e0',
          200: '#fccec5',
          300: '#f9a99a',
          400: '#f47a64',
          500: '#ea5a3f',
          600: '#d8422a',
          700: '#b53422',
          800: '#922e22',
          900: '#782b22',
          950: '#411210',
        },
        // Warm cream/neutral background tones
        cream: {
          50: '#fdfcfa',
          100: '#f9f6f1',
          200: '#f2ebe2',
          300: '#e8dccd',
          400: '#d4c3ad',
          500: '#bda084',
          600: '#a5856a',
          700: '#8a6e58',
          800: '#6f5748',
          900: '#5a473b',
          950: '#3a2e26',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-right': 'slideRight 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(10,22,34,0.92) 0%, rgba(30,45,66,0.7) 50%, rgba(30,45,66,0.3) 100%)',
        'hero-overlay-dark': 'linear-gradient(180deg, rgba(10,22,34,0.85) 0%, rgba(10,22,34,0.6) 60%, rgba(10,22,34,0.85) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #102030 0%, #1e2d42 50%, #155f5f 100%)',
        'coral-gradient': 'linear-gradient(135deg, #ea5a3f 0%, #d8422a 100%)',
        'shimmer-bg': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(10,22,34,0.06), 0 1px 2px rgba(10,22,34,0.04)',
        'card-hover': '0 12px 32px rgba(10,22,34,0.12), 0 4px 8px rgba(10,22,34,0.06)',
        'nav': '0 2px 20px rgba(10,22,34,0.08)',
        'hero': '0 20px 60px rgba(10,22,34,0.25)',
      },
    },
  },
  plugins: [],
};
