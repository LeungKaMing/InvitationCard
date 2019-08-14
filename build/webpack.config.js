const webpack = require('webpack')
const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (options = {}) => ({
  entry: {
    index: './src/main.js'
  },
	mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    overlay: true
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[hash]',
    chunkFilename: '[id].js?[hash]',
    publicPath: options.dev ? '/dist/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)；默认为async，表示只会提取异步加载模块的公共代码，initial表示只会提取初始入口模块的公共代码，all表示同时提取前两者的代码
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
      cacheGroups:{ // 这里开始设置缓存的 chunks
        // 公共块抽离 - 只抽离入口模块
        common: {
          chunks: 'initial',
          minChunks: 2, // 引用最少2次被引用或以上都要抽离
          priority: 20,  // 优先级最高
          reuseExistingChunk: true, // 可设置是否重用该chunk
          name: 'common',
          enforce: true
        },
        // 第三方依赖抽离 - 既抽离入口模块，又抽离异步引入的模块
        vendors: {
          minChunks: 1, // 引用最少2次被引用或以上都要抽离
          test: /[\\/]node_modules[\\/]/, 
          priority: 10,
          name: 'vendors',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: true,
      hash: true,
      showErrors: true
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
})
