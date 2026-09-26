/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        neo: {
          yellow: "#FFDE59",
          lime: "#A6FA37",
          pink: "#FF66C4",
          cyan: "#00F0FF",
          orange: "#FF914D",
          purple: "#C490FF",
          black: "#000000",
          white: "#FFFFFF",
          bg: "#FFF9E6",
          card: "#FFFFFF",
          gray: "#E5E5E5",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-lg": "6px 6px 0px 0px #000000",
        "neo-xl": "8px 8px 0px 0px #000000",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
        5: "5px",
      },
    },
  },
  plugins: [],
};
