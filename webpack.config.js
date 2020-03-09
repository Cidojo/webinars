const path = require(`path`);
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
    context: paths.app,
    resolve: {
      unsafeCache: true,
      symlinks: false
    }
  },
  {
    entry: ['@babel/polyfill', `${paths.app}/index.js`],
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'none',
  },
  parts.loadHtml(),
  parts.lintJS({ include: paths.app, options: lintJSOptions }),
  parts.loadIcons(),
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
  {
    plugins: [
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions),
      new HtmlWebpackPlugin({
        template: `${paths.app}/template/default.html`,
        minify: {
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        }
      }),
      new CopyPlugin([
        {
          from: `${paths.app}/assets/img/`,
          to: 'assets/img'
        }
      ]),
      new SpriteLoaderPlugin()
    ]
  }
]);

const productionConfig = merge([
  {
    mode: 'production'
  },
  {
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000 // in bytes
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['bundle.js', 'styles.css', 'html/*.html']
      })
    ]
  },
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
  parts.optimizeImages()
]);

const developmentConfig = merge([
  {
    mode: 'development'
  },
  {
    devServer: {
      proxy: {
        '/webinars': 'http://localhost:5000',
        '/uploads': 'http://localhost:5000'
      },
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      contentBase: paths.build,
      compress: false,
      open: true
    }
  },
  parts.loadCSS({ include: paths.app, use: [cssPreprocessorLoader] }),
  parts.loadJS()
]);

module.exports = (env) => {
  process.env.NODE_ENV = env;
  return merge(
    commonConfig,
    env === 'production' ? productionConfig : developmentConfig
  );
};
