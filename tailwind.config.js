module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
  plugins: [require('@tailwindcss/forms'), require("daisyui")],
};