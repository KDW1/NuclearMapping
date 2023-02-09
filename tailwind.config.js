/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './**/*.ejs'
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
    display: ['group-hover'],
    extend: {
      colors: {
        main: colors.rose[700],
        shade: colors.red[900],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
