/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gallery: {
          bg: "#ECECEC",
          accent: "#A3E635",
          accentDark: "#7CB518",
          ink: "#191919",
          inkSoft: "#63645F",
          line: "#DADAD4",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};