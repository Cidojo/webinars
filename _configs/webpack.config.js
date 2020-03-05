const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ImageMinWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
// const CleanPlugin = require('clean-webpack-plugin');

const debugMode = false;

const parts = require('./webpack.parts');

const lintJSOptions = {
  emitWarning: true,
  failOnWarning: false,
  failOnError: false,
  fix: true,
  cache: true,
  formatter: require('eslint-friendly-formatter')
};

const paths = getPaths({
  sourceDir: 'src',
  buildDir: 'public/dist',
  images: 'img',
  js: 'js',
  fonts: 'fonts',
  icons: 'icons',
  staticDir: 'assets'
});

const lintStylesOptions = {
  context: path.resolve(__dirname, `${paths.app}/styles`),
  syntax: 'scss',
  emitErrors: false,
  fix: true
};

// const svgSpriteOptions = {
//   options: {
//     symbolId: filePath => path.basename(filePath, '.svg'),
//     extract: true,
//     spriteFilename: svgPath => `assets/sprite/sprite${svgPath.substr(-4)}${process.env.NODE_ENV === 'production' ? '' : ''}`,
//     esModule: false
//   },
//   include: path.join(paths.app, paths.icons)
// };

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
    },
    entry: {
      main: `${paths.app}/app.js`
    },
    output: {
      path: paths.build,
      publicPath: parts.publicPath,
      filename: `${paths.js}/[name].bundle.js`
    },
    devtool: debugMode || process.env.NODE_ENV === 'development' ? 'source-map' : 'none',
    plugins: [
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions)
    ],
    module: {
      noParse: /\.min\.js/
    }
  },
  parts.lintJS({ include: paths.app, options: lintJSOptions }),
  parts.loadFonts({
    include: paths.app,
    options: {
      name: `${paths.fonts}/[name].[ext]`
    }
  })
]);

const productionConfig = merge([
  {
    mode: debugMode ? 'development' : 'production',
    output: {
      filename: `${paths.js}/[name].bundle.js`
    }
  },
  parts.loadJS(),
  parts.extractCSS({
    include: paths.app,
    use: [parts.autoprefix(), cssPreprocessorLoader],
    options: {
      filename: `${paths.css}/style.css`
    }
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      }
    }
  }),
  parts.loadImages({
    exclude: path.join(paths.app, paths.icons),
    options: {
      limit: 15000,
      name: `${paths.images}/[name].[ext]`
    }
  }),
  parts.optimizeImages()
]);

const developmentConfig = merge([
  {
    mode: 'development'
  },
  parts.devServer({
    host: '0.0.0.0', // to access from mobile
    port: process.env.PORT || 3000
  }),
  parts.loadCSS({ include: paths.app, use: [cssPreprocessorLoader] }),
  parts.loadImages({
    include: paths.app,
    exclude: path.join(paths.app, paths.icons)
  }),
  parts.loadJS()
]);

module.exports = env => {
  process.env.NODE_ENV = env;

  return merge(
    commonConfig,
    env === 'production' ? productionConfig : developmentConfig,
    {
      plugins: [
        new HtmlWebpackPlugin({
          filename: `index.html`,
          template: 'template/default.html',
          title: 'Semrush'
        }),
        new ImageMinWebpWebpackPlugin({
          config: [{
            test: /\.(jpe?g|png)/,
            options: {
              quality: 75
            }
          }],
          overrideExtension: true,
          detailedLogs: false,
          silent: false,
          strict: true
        })
      ]
    }
  );
};

function getPaths ({
                     sourceDir = 'app',
                     buildDir = 'build',
                     staticDir = '',
                     icons = 'icons',
                     images = 'images',
                     fonts = 'fonts',
                     js = 'scripts',
                     css = 'styles'
                   } = {}) {
  const assets = { images, fonts, js, css };

  return Object.keys(assets).reduce((obj, assetName) => {
    const assetPath = assets[assetName];

    obj[assetName] = !staticDir ? assetPath : `${staticDir}/${assetPath}`;

    return obj;
  }, {
    app: path.join(__dirname, sourceDir),
    build: path.join(__dirname, buildDir),
    staticDir,
    icons
  });
}
