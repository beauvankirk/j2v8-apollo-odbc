// var webpack = require('webpack')
// var nodeExternals = require('webpack-node-externals')
var path = require('path')
var fs = require('fs')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./webpack.common')

var dir_js = path.resolve(__dirname, '../src');
var dir_css = path.resolve(__dirname, '../css');
var dir_build = path.resolve(__dirname, '../dist');
var webpackMerge = require('webpack-merge');
var configPatch = {
  target: 'node',
  // cache: false,
  // context: __dirname,
  // debug: false,
  // devtool: false,
  entry: './src/main/js/server',
  output: {
    path: path.join(__dirname,'app-target','server')
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
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
  // Object.assign(config, configPatch);

  module.exports = webpackMerge({},config,configPatch);
  // Helpers
  function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request); return;
    }
    cb();
  }
