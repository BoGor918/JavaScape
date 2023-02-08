/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/src/images/Background.png')",
        'banner': "url('/src/images/Banner2.png')",
      }
    },
    fontFamily: {
      exo: ["Exo", "sans-serif"]
    }
  },
  plugins: [],
}