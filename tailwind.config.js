/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    "bg-primaryGreen",
    "dark:bg-primaryGreenDark",
    "text-beigeLight",
    "dark:text-beigeLightDark",
    "text-primaryGreen",
    "dark:text-primaryGreenDark",
    "bg-beigeLight",
    "dark:bg-beigeLightDark",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
