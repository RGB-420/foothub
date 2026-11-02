/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(
        ["background", "surface", "panel", "primary", "text", "muted", "subdued", "border"].map(
          (name) => [name, `rgb(var(--color-${name}) / <alpha-value>)`],
        ),
      ),
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [],
}
