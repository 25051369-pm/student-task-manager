/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#121212',
        cardDark: '#1E1E1E',
        accent: '#BB86FC',
        accentHover: '#3700B3'
      },
      boxShadow: {
        'neubrutalism': '4px 4px 0px 0px rgba(187, 134, 252, 1)',
        'neubrutalism-hover': '6px 6px 0px 0px rgba(187, 134, 252, 1)',
      }
    },
  },
  plugins: [],
}