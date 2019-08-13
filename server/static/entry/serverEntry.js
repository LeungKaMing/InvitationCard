// test: cnpm install babel-cli --save babel-node server/app.js
// 从这句代码开始，所有代码都会转换成es6格式使用env这个参数
require('babel-polyfill')
require('babel-register')({
    presets: [ 'env' ]
})
const App = require('../common/initalEntry')
// 本来是打算给webpack.server.config.js做一个服务端配置入口的，先注释掉
// console.log(App, App.inital('server'), '<<<<<<')
// App.inital('server').dom
module.exports = App