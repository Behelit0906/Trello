/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', 'Arial'],
      },
      colors: {
        dark: '#1D2125',
      }
    },
  },
  plugins: [],
}

