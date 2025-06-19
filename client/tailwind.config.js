/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pastelgreen: '#acf2bc',
        bloodred: '#ed1d49',
        lightgray: '#cccccc',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
