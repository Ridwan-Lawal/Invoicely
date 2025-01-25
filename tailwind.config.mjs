/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        lgl: "1150px",
      },
      colors: {
        "color-01": "#7C5DFA",
        "color-02": "#9277FF",
        "color-03": "#1E2139",
        "color-04": "#252945",
        "color-05": "#DFE3FA",
        "color-06": "#888EB0",
        "color-07": "#7E88C3",
        "color-08": "#0C0E16",
        "color-09": "#EC5757",
        "color-10": "rgb(255, 151, 151)",
        "color-11": "#F8F8FB",
        "color-12": "#141625",
        "color-13": "#373B53",
        "color-14": "#F9FAFE",
        "color-15": "#DFE3FA",
        "color-16": "#494E6E",
        "color-17": "#777F98",
        "color-18": "#33D69F",
        "color-19": "#FF8F00",
      },
      ".scrollbar": {
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#DFE3FA",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
