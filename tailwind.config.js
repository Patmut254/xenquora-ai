/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 30px rgba(139,92,246,0.3)",
      },
    },
  },
  plugins: [],
};
