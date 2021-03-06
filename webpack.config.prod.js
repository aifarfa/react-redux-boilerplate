const path = require('path');
const webpack = require('webpack');
const APP_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./public');

module.exports = {

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
    new webpack.optimize.UglifyJsPlugin({
      debug: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
