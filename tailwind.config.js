import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 🎨 Espacio para personalización institucional
      colors: {
        primary: "#1a1a1a",
        text: "#ffffff",
        accent: "#e0b400",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
