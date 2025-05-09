/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /(from|to|text|bg|border|ring)-(indigo|emerald|amber|rose|gray)-(50|100|500|600|700|900)/,
      variants: ['hover', 'focus', 'active']
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'sans-serif'
        ],
        heading: [
          'Montserrat',
          'sans-serif'
        ]
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'float-shadow': 'float-shadow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite', 
        'tilt': 'tilt 10s infinite linear',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
      },
      boxShadow: {
        'glow': '0 0 16px -4px rgba(99,102,241,0.3)',
      },
      screens: {
        'xs': '475px',
      },
      fontSize: {
        'mobile-xs': '0.6rem',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        'y-12': 'rotateY(12deg)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      },
    },
  },
  plugins: [],
};
