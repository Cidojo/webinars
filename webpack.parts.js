exports.loadImages = ({ options } = {}) => ({
  module: {
    rules: [
      {
        test: /^(?!icon).*\.(png|jpg|svg|webp)$/,
        use: {
          loader: 'file-loader',
          options
        }
      }]
  }
});

exports.optimizeImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|webp?g)$/i,
        include,
        exclude,
        use: {
          loader: 'image-webpack-loader',
          options: {
            gifsicle: {
              interlaced: false,
              optimizationLevel: 7
            },
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      }
    ]
  }
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options
        }
      }
    ]
  }
});
