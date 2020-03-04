module.exports = (api) => {
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');

  return {
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-transform-typeof-symbol',
      '@babel/plugin-syntax-dynamic-import',
    ],
    presets: [
      '@babel/preset-env',
      '@babel/react'
    ],
    overrides: [{
      test: './node_modules/**/*',
      compact: true
    }]
  };
};
