const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const publicPath = '';

exports.publicPath = publicPath;

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    disableHostCheck: true,
    contentBase: './public',
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath,
    host,
    port,
    overlay: {
      errors: true,
      warnings: false
    }
  }
});

exports.lintJS = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
});

const sharedCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
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

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')],
    sourceMap: true
  }
});

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: options,
        canPrint: true
      })
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
          }, ...sharedCSSLoaders, ...use]
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
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../', sourceMap: true } },
          ...sharedCSSLoaders, ...use]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(options)
  ]
});

exports.svgSprite = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /.*icon.*\.svg$/,
        include,
        exclude,
        use: [
          {
            loader: 'svg-sprite-loader',
            options
          },
          'svg-transform-loader'
        ]
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /^(?!icon).*\.(png|jpe?g|svg|webp)$/,
        //
        include,
        exclude,
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
        // Capture eot, ttf, woff, and woff2
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

exports.loadJS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,

        include,
        exclude,

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
