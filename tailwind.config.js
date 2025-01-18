/** @type {import('tailwindcss').Config} */
export default {
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
        background: {
          light: "#FFFFFF",
          dark: "#2D2D2D",
        },
      },
    },
  },
  plugins: [],
};
