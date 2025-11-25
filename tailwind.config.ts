/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/src/assets/icons/house.jpg')",
      },
    },
  },
  plugins: [],
}
