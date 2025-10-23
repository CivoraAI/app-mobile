/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b1220",
        card: "#111827",
        border: "#1f2937",
        text: "#e5e7eb",
        sub: "#9ca3af",
        brand: "#2563eb",
        brandSoft: "#60a5fa",
        ok: "#16a34a",
        danger: "#dc2626",
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [],
};