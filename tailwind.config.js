/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { teal: "#009194", tealDark: "#007E80", ink: "#1A1C28" }
      }
    },
  },
  plugins: [],
}
