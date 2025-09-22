/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ffb705",
        background: "#e7f3ff",
        secondary: "#9c7b5c",
        tertiary: "#8a6d0c",
      },
    },
  },
  plugins: [],
}