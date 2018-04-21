const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

const filename = './client/dist/bundle.js';
const cssFilename = './client/dist/bundle.css';

const extractSass = new ExtractTextPlugin({
  filename: cssFilename
});

const plugIns = [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('development')},
      'process.env.BROWSER': JSON.stringify(true)
    }),
    extractSass,
    new GenerateJsonPlugin('shop-version.json', {
      commit: gitRevisionPlugin.commithash()
    })
  ];

module.exports = {
  entry: ['./client/src/main.js'],
  plugins: plugIns,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: [
              'transform-object-rest-spread',
              [
                'transform-es2015-classes',
                {
                  loose: true,
                },
              ],
            ],
          },
        },
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                data: `@import '${path.resolve(__dirname, 'client', 'src', 'styles').replace(/\\/g, '/')}/Variables';
                @import '${path.resolve(__dirname, 'client', 'src', 'styles').replace(/\\/g, '/')}/Mixins';`
              }
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader',
      },
    ],
  },
  output: {
    publicPath: '/',
    filename: filename,
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false
   },
};
