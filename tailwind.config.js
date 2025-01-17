/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/@iconify/vue/dist/index.js",
  ],
  darkMode: "class", // Enables dark mode using the "class" strategy
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#B3B3B3",
          light: "#666666",
        },
        secondary: {
          light: "#2D2D2D",
          dark: "#CCCCCC",
        },
        background: {
          light: "#FFFFFF",
          dark: "#2D2D2D",
        },
        accent: {
          light: "#007ACC",
          dark: "#66BFFF",
        },
      },
    },
  },
  plugins: [],
};
