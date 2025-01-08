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
        "color-11": "#F8F8FB", // light bg
        "color-12": "#141625",
        "color-13": "#373B53",
        "color-14": "#F9FAFE",
        "color-15": "#DFE3FA",
      },
    },
  },
  plugins: [],
};
