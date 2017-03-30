
var webpack = require('webpack')
// var nodeExternals = require('webpack-node-externals')
var path = require('path')
var fs = require('fs')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./webpack.common')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var dir_voyager = path.resolve(__dirname, '../src/voyager');
var dir_build = path.resolve(__dirname, '../dist/voyager');
var config = {
  // target: 'node',
  // cache: false,
  // context: __dirname,
  // debug: false,
  // devtool: false,
  target: 'web',
  entry: {
    app : path.resolve(dir_voyager, 'voyager.jsx')
  },
  output: {
    path: dir_build,
    filename: 'voyager.min.js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin(
      {
        options: {
          minimize: true,
          debug: false
        }
      }
    ),
    // new CopyWebpackPlugin(
    //   [
    //     {
    //       from: path.resolve(dir_voyager, '../../node_modules/graphql-voyager/dist/voyager.worker.js'),
    //       to: dir_build
    //     },
    //     {
    //       from: path.resolve(dir_voyager, 'index.html'),
    //       to: dir_build
    //     },
    //     {
    //       from: path.resolve(dir_voyager, 'voyager.css'),
    //       to: dir_build
    //     }
    //   ]
    // ),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
  // plugins: [
  //   // new CopyWebpackPlugin([{
  //   //   from: '../src/server/views',
  //   //   to: './views'   // copy to dist/views
  //   // }]),
  //
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': '"production"',
  //     __CLIENT__: false,
  //      __SERVER__: true,
  //       __PRODUCTION__:
  //       true, __DEV__: false,
  //   }),
  //   // new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
  //   // // new ExtractTextPlugin('../static/[name].css')
  //   // ],
  //   // node: {
  //   //   __dirname: true,
  //   //   fs: 'empty'
  //   // }
  // ]
}

module.exports = config
