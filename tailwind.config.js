const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: ["./app/**/*.html.slim"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
