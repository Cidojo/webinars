module.exports = {
  plugins: [
    '@babel/plugin-transform-typeof-symbol',
    '@babel/plugin-syntax-dynamic-import',
  ],
  presets: [
    `@babel/preset-react`,
    [`@babel/preset-env`, {
      targets: {
        node: `current`
      }
    }]
  ],
  overrides: [{
    test: './node_modules/**/*',
    compact: true
  }]
};
