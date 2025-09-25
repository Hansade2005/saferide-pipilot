/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
 borderColor: theme => ({
 ...theme('colors'),
 'border': '#e5e7eb', // Define your custom border color
 }),
 },
  },
  plugins: [],
}