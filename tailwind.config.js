/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: "var(--font-ubuntu)",
        jakarta: "var(--font-plus-jakarta-sans)",
      },
      colors: {
        brand: {
          "cerulean-blue": "#374CB7",
          "cerulean-blue-dark": "#3244a5",
          "storm-dust": "#636262",
          "white-smoke": "#F5F5F5",
          "white-smoke-100": "#F6F6F6",
          bittersweet: "#008b8b",
          "bittersweet-dark": "#027171",
          haiti: "#1B0330",
          "star-dust": "#9E9E9E",
          "paris-green": "#03a2a2",
          "light-gray": "#F2F2F2",
          midnight: "#1B0330",
          "mountain-mist": "#959595",
          danger: "#FF5733",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
