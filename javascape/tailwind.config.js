/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/src/images/Background.png')",
      }
    },
    fontFamily: {
      exo: ["Exo", "sans-serif"]
    }
  },
  plugins: [],
}