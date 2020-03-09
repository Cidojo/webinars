module.exports = {
  plugins: [
    '@babel/plugin-transform-typeof-symbol',
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: [
    `@babel/preset-react`,
    [`@babel/preset-env`, {
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'ie >= 11']
      }
    }]
  ],
  overrides: [{
    test: './node_modules/**/*',
    compact: true
  }]
};
