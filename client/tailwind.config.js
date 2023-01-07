/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#FF5733",
          default: "#F97316",
          light: "#FB923C",
          lighter: "#FDE68A",
        },
        secondary: {
          dark: "rgb(22, 78, 99)",
          default: "rgb(8 145 178)",
        },
        typo: {
          highlight: "rgba(255,255,255,0.9)",
          subtle: "rgba(255, 255, 255, 0.65)",
        },
        background: {
          default: "#0F172A",
          light: "#eee",
        },
        bord: {
          default: "#ccc",
          light: "#8595AD",
        },
      },
    },
  },
  plugins: [],
};
