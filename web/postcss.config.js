
const tailwindcss = require('tailwindcss');

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
  ],
};
