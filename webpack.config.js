const path = require(`path`);
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const info = require(`./package.json`);
const parts = require('./webpack.parts');
const paths = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
};

const lintJSOptions = {
  emitWarning: true,
  failOnWarning: false,
  failOnError: false,
  fix: true,
  cache: true,

  formatter: require('eslint-friendly-formatter')
};

const lintStylesOptions = {
  context: path.resolve(__dirname, `${paths.app}/styles`),
  syntax: 'scss',
  emitErrors: false,
  fix: true
};

const cssPreprocessorLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  }
};

const commonConfig = merge([
  {
    mode: 'production'
  },
  {
    entry: `./src/index.js`,
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devServer: {
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      contentBase: path.join(__dirname, `public`),
      compress: false,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`,
          },
        }
      ]
    },
    devtool: `source-map`
  },
  parts.loadHtml(),
  parts.minifyJS({
    terserOptions: {
      extractComments: false,
      parse: {
        ecma: 8
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true
      }
    },
    parallel: true,
    cache: true
  }),
  parts.loadJS(),
  parts.extractCSS({
    include: paths.app,
    use: [parts.autoprefix(), cssPreprocessorLoader],
    options: {
      filename: `styles.css`
    }
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      }
    }
  }),
  parts.loadIcons(),
  {
    plugins: [
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions),
      new HtmlWebpackPlugin({
        template: 'src/template/default.html',
        minify: {
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        }
      }),
      new CopyPlugin([
        {
          from: 'src/assets/img/',
          to: 'assets/img'
        }
      ]),
      new SpriteLoaderPlugin()
    ]
  }
]);

module.exports = (env) => {
  return merge([
    commonConfig,
    parts.loadFonts({
      include: paths.app,
      options: {
        name: `fonts/[name].[ext]`
      }
    }),
    parts.loadImages({
      options: {
        limit: 15000,
        name: `assets/img/[name].[ext]`
      }
    }),
    parts.optimizeImages()
  ]);
};
