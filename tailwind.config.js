const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',   // River (Teal-700)
        secondary: '#92400E', // Earth (Amber-800)
        accent: '#F59E0B',     // Ritual (Amber-500)
        background: '#FFFBEB', // Parchment (Amber-50)

        // Dark theme overrides can go here if needed, but Tailwind handles most of it.
        dark: {
          background: '#1c1917', // Example dark background
          primary: '#5EEAD4',    // Example dark primary
          secondary: '#FDE68A', // Example dark secondary
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', ...fontFamily.serif],
        sans: ['"Inter"', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}