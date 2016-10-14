const path = require('path');
const webpack = require('webpack');
const APP_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./public');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = config = {

  entry: [
    'babel-polyfill',
    APP_DIR + '/index.jsx'
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: APP_DIR,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?importLoaders=1'
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    // new ExtractTextPlugin('style.css', {
    //   allChunks: true,
    //   disable: true
    // }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
