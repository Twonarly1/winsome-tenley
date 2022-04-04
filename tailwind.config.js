module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#272727',
        'secondary-dark': '#1c1c1c',
        'primary-light': '#dddddd',
      },
    },
  },
  plugins: [require('daisyui'), require('prettier-plugin-tailwindcss')],
}
