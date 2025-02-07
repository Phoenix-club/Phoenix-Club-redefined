/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      backG:"#070A21",
      nOran:"#E86A5D",
    },
    extend: {
      fontFamily: {
        pixelSans: ['Pixelify Sans', "serif"], 
      },
    },
  },
  plugins: [
    // require('tailwindcss-image-rendering')(),
  ],
}