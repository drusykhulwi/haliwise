/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0faf4',
          100: '#daf2e5',
          200: '#b8e5cd',
          300: '#88d1ae',
          400: '#54b688',
          500: '#2d9669',
          600: '#1e7a53',
          700: '#196244',
          800: '#174e38',
          900: '#14402f',
          950: '#0a2419',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #0a2419 0%, #14402f 40%, #0c4a6e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(20,64,47,0.8) 0%, rgba(12,74,110,0.6) 100%)',
        'score-gradient': 'linear-gradient(135deg, #196244 0%, #0284c7 100%)',
      },
    },
  },
  plugins: [],
};
