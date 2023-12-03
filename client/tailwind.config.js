/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Rubik", "sans-serif"],
      body: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-purple": "#714CF9",
        "secondary-purple": "#F5E8FE",
        "accent-purple": "#F7F2FB",
        "purple-dark": "#2F1A44",
        "ttagz-yellow": "#FAD74A",
        white: "#FFFDFB",
      },
    },
  },
  plugins: [],
};
