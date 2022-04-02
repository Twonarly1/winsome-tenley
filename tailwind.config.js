module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-pattern': "url('/publiic/bg.jpeg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
