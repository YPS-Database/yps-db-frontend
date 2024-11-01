/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        browseBy: "minmax(8rem, max-content) 1fr",
        entryParams: "minmax(8rem, max-content) 1fr",
      },
      boxShadow: {
        card: "0 3px 7px 2px rgba(7, 30, 54, 0.22)",
      },
      colors: {
        boxBg: "#fffdfd",
        happyRed: "rgb(247, 85, 85)",
        happyYellow: "rgb(244, 179, 44)",
        happyGreen: "rgb(70, 187, 97)",
        happyBlue: "rgb(77, 160, 249)",
        happyPurple: "rgb(228, 116, 244)",
        happyGrey: "#8685858a",
        orchidWhite: {
          "50": "#fffcf2", // bg
          "100": "#fef1c7",
          "200": "#fde28a",
          "300": "#fcce4d",
          "400": "#fbb824",
          "500": "#f5970b",
          "600": "#d97106",
          "700": "#b44e09",
          "800": "#923c0e",
          "900": "#78320f",
          "950": "#451803",
        },
        whiteIce: {
          50: "#EBFBFB",
          100: "#DAF7F8", // nav bg
          200: "#B3E8F1",
          300: "#8DD3E9",
          400: "#66B6E2",
          500: "#4093DB",
          600: "#266BC7",
          700: "#265791",
          800: "#123969",
          900: "#101753",
          950: "#0C0F40",
        },
        rustyRed: {
          50: "#FAF2F0",
          100: "#F2E2DE",
          200: "#E6C7C1",
          300: "#D8A8A2",
          400: "#C88983",
          500: "#BB6C68",
          600: "#A6504F",
          700: "#874344", // footer
          800: "#5A2B2B",
          900: "#2E1615",
          950: "#190C0B",
        },
      },
    },
  },
  plugins: [],
};
