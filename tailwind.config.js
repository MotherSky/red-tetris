/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["'Summer Pixel 22'", "serif"],
      },
      backgroundImage: {
        cubes: "url('images/bg3.jpg')",
      },
    },
  },
  plugins: [],
};
