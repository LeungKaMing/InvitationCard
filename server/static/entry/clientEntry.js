require('babel-polyfill')
require('babel-register')({
    presets: [ 'env' ]
})
const App = require('../common/initalEntry')
App.inital('client').dom