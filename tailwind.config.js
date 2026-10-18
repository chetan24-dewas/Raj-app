/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        body: ["Work Sans", "-apple-system", "Segoe UI", "sans-serif"],
      },
      colors: {
        cream: "var(--cream)",
        panel: "var(--panel)",
        beige: "var(--beige)",
        charcoal: "var(--charcoal)",
        "charcoal-soft": "var(--charcoal-soft)",
        walnut: "var(--walnut)",
        clay: "var(--clay)",
        "clay-dark": "var(--clay-dark)",
        brass: "var(--brass)",
        line: "var(--line)",
      },
    },
  },
  plugins: [],
};
