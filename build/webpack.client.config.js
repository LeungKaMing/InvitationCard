const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config')
baseConfig.entry = {ssrClientEntry: path.resolve(__dirname, '../server/static/entry/clientEntry.js')}

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: true,
      hash: true,
      showErrors: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ]
})