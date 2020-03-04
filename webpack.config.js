const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    inline: true,
    hot: true,
    host: 'localhost',
    port: 3000
  }
};
