module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers:
            "last 2 versions, > 1%, ie >= 6, Android >= 4, iOS >= 6, and_uc > 9",
          node: "0.10",
        },
        modules: false,
        loose: false,
        // 'useBuiltIns': 'usage',
        // 'corejs': '3',
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        regenerator: false,
      },
    ],
  ],
};
