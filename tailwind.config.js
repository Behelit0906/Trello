/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
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
        textDark: '#9FADBC',
        navbar: 'var(--dynamic-navbar-color)',
        sidenavbar: 'var(--dynamic-side-navbar-color)',
        dynamicTextColor: 'var(--dynamic-text-color)'
      },
      backgroundImage: {
        1: "url('./src/assets/backgrounds/bg-1.webp')",
        2: "url('./src/assets/backgrounds/bg-2.webp')",
        3: "url('./src/assets/backgrounds/bg-3.webp')",
        4: "url('./src/assets/backgrounds/bg-4.webp')"
      }
    },
  },
  plugins: [],
}

