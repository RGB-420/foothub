/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B1120",
        surface: "#111827",
        panel: "#0F1A2D",
        primary: "#22C55E",
        cyan: "#22D3EE",
        contrast: "#F97316",
        violet: "#8B5CF6",
        text: "#F8FAFC",
        muted: "#CBD5E1",
        subdued: "#94A3B8",
        border: "#1F2937",
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "Arial Narrow", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
}
