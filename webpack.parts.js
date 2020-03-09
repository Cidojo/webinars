const path = require(`path`);
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const sharedCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      // localIdentName: '[hash:base64:5]',
      importLoaders: 1,
      sourceMap: true
    }
  }, {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: true
    }
  }
];

exports.loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {minimize: true}
        }
      }
    ]
  }
});

exports.loadJS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,

        include,
        exclude: /node_modules/,

        loader: 'babel-loader',
        options
      }
    ]
  }
});

exports.minifyJS = options => ({
  optimization: {
    minimizer: [
      new TerserPlugin(options)
    ]
  }
});

exports.loadImages = ({ options } = {}) => ({
  module: {
    rules: [
      {
        test: /^(?!icon).*\.(png|jpg|svg|webp)$/,
        include: path.resolve(__dirname, 'src/assets/img'),
        exclude: path.resolve(__dirname, 'src/assets/icons'),
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

exports.loadIcons = () => ({
  module: {
    rules: [
      {
        test: /.*\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/icons'),
        exclude: path.resolve(__dirname, 'src/assets/img'),
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
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

exports.loadCSS = ({ include, exclude, use } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,

        include,
        exclude,

        use: [
          {
            loader: 'style-loader'
          },
          ...sharedCSSLoaders.concat(use)
        ]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, options, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,

        include,
        exclude,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              sourceMap: true
            }
          },
          ...sharedCSSLoaders,
          ...use
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(options)
  ]
});

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: options,
        canPrint: true // false for analyzer
      })
    ]
  }
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')],
    sourceMap: true
  }
});
