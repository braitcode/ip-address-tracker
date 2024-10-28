/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'VeryDarkGray': 'hsl(0, 0%, 17%)',
        'DarkGray': 'hsl(0, 0%, 59%)'
      }
    },
  },
  plugins: [],
}