/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // <--- Added this
        volkhov: ['Volkhov', 'serif'],
      },
      colors: {
        brand: {
          light: '#a5b4fc', // Periwinkle for "Kindness"
          DEFAULT: '#6366f1', // Main Purple/Blue
          dark: '#1e1b4b', // Dark Navy for "Where"
        }
      }
    },
  },
  plugins: [],
}