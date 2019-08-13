const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.base.config')
baseConfig.entry = {ssrServerEntry: path.resolve(__dirname, '../server/static/entry/serverEntry.js')}
baseConfig.output.libraryTarget = 'commonjs2'
baseConfig.optimization = {}  // 根据官方文档记载，服务端如果设置分块会报错，客户端才能设置分块

module.exports = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  resolve: {},
  externals: nodeExternals({
    whitelist: /\.css$/ // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖 => 毕竟服务端打包不存在import
  }),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})