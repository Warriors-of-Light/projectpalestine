/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-dark": "theme(colors.green.950)",
        "app--dark": "theme(colors.green.800)",
        "app-light": "theme(colors.green.50)",
        "app--light": "theme(colors.green.100)",
        "app-primary": "theme(colors.green.200)",
        "app--primary": "theme(colors.green.600)",
        "app-red": "theme(colors.red.200)",
        "app--red": "theme(colors.red.600)",
        "app-yellow": "theme(colors.yellow.200)",
        "app--yellow": "theme(colors.yellow.600)",
        "app-green": "theme(colors.green.200)",
        "app--green": "theme(colors.green.600)",
        "app-shadow": "#00000025",
      },
      spacing: {
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        600: "600px",
        650: "650px",
        700: "700px",
        750: "750px",
        800: "800px",
        850: "850px",
        900: "900px",
        950: "950px",
        1000: "1000px",
        1200: "1200px",
        1500: "1500px",
        2000: "2000px",
      },
      screens: {
        xs: "320px", // Extra small screens
        xxs: "150px", // Extra small screens
      },
      height: {
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "85vh": "85vh",
        "90vh": "90vh",
      },
      fontFamily: {
        visible: "'Lilita One', sans-serif",
      },
      animation: {
        colorChange: "opacityChange 2s forwards, colorChange 3s infinite",
        moveText1: "moveText1 2s forwards",
        moveText2: "moveText2 2s forwards",
        moveText3: "moveText3 2s forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
