/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cubes: "url('images/bg3.jpg')",
      },
    },
  },
  plugins: [],
};
