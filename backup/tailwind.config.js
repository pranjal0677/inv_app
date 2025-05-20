/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8956FF',
        'primary-dark': '#6A3AE8',
        'primary-light': '#AE90FF',
        'primary-bg': '#F9F7FF',
        secondary: '#FF8C42',
        'secondary-dark': '#F77D32',
        'secondary-light': '#FFB07D',
        'secondary-bg': '#FFF5EE',
        'gray-light': '#f3f4f6',
        'gray-dark': '#4b5563',
        'purple-light': '#EAE2FF',
        'purple-medium': '#C4A8FF',
        'purple-dark': '#7644E1',
        'orange-light': '#FFD5B8',
        'orange-medium': '#FFAA71',
        'success': '#22C55E',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 18px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'input-focus': '0 0 0 2px rgba(137, 86, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #8956FF, #6A3AE8)',
        'gradient-secondary': 'linear-gradient(to right, #FF8C42, #F77D32)',
        'gradient-purple': 'linear-gradient(135deg, #8956FF 0%, #AE90FF 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF8C42 0%, #FFB07D 100%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 