module.exports = {
  presets: [
    "@babel/preset-env", // ES6+ синтаксийг хөрвүүлэх
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs", // ESM-ийг CommonJS-д хөрвүүлэх
  ],
};
