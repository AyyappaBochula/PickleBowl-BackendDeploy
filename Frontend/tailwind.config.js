/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        cream: "#FFF7ED",     // main background
        primary: "#F97316",   // orange (buttons, highlights)
        secondary: "#16A34A", // green (success, add buttons)
        muted: "#6B7280",     // soft gray text
      },

      borderRadius: {
        xl: "1rem",   // consistent rounded corners
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)", // premium soft shadow
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },

  plugins: [],
};