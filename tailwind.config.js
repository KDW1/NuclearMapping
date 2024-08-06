/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'bruh': '430px',

      'sm': '550px',
      // => @media (min-width: 640px) { ... }

      'md': '675px',
      // => @media (min-width: 768px) { ... }
      'overflow-x': '740px',

      'lg': '1050px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        mainLight: colors.blue[100],
        main: colors.blue[300],
        shade: colors.blue[500],
        noBgColor: colors.white,
        secondaryLightText: colors.blue[400]
      },
    },
  },
  plugins: [],
}
