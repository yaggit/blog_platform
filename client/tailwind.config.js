/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {animation: {
      'gradient': 'gradient-animation 3s ease infinite',
    },
    backgroundSize: {
      'size-200': '200% 200%',
    },},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

