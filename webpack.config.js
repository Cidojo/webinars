const path = require(`path`);
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const info = require(`./package.json`);
const parts = require('./webpack.parts');

const CSSExtract = new ExtractTextPlugin('styles.css');


const paths = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
};

const commonConfig = merge([
  {
    entry: [`@babel/polyfill`, `./src/index.js`],
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, `public`),
      compress: false,
      open: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {minimize: true}
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`,
          },
        }, {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              'postcss-loader',
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }, {
          test: /.*\.svg$/i,
          include: path.resolve(__dirname, 'src/assets/icons'),
          exclude: path.resolve(__dirname, 'src/assets/img'),
          use: [
            'svg-sprite-loader',
            'svgo-loader'
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/template/default.html',
        minify: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        }
      }),
      CSSExtract,
      new CopyPlugin([
        {
          from: 'src/assets/img/',
          to: 'assets/img'
        }
      ]),
      new SpriteLoaderPlugin()
    ],
    devtool: `source-map`
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
