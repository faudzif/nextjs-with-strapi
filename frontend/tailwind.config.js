/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    screens: {
      sm: "360px",
      // => @media (min-width: 576px) { ... }
      md: "600px",
      // => @media (min-width: 960px) { ... }
      lg: "905px",
      // => @media (min-width: 1440px) { ... }
      xl: "1240px",
      // => @media (min-width: 1440px) { ... }
      xxl: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
    container: {
      // you can configure the container to be centered
      center: true,
      // or have default horizontal padding
      //   padding: "1rem",
      padding: {
        // DEFAULT: "1rem",
        sm: "24px",
        md: "32px",
        lg: "32px",
        xl: "124px",
        xxl: "156px",
      },
      maxWidth: {
        xxl: "100%",
      },
      // default breakpoints but with 40px removed
    },
  },
  plugins: [],
};
