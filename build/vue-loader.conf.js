var utils = require('./utils')
var config = require('../config')
var isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'demo'
let sourceMap = false

switch (process.env.NODE_ENV) {
  case 'production':
    sourceMap = config.build.productionSourceMap
    break
  case 'debug':
    sourceMap = config.debug.productionSourceMap
    break
  case 'development':
    sourceMap = config.dev.cssSourceMap
    break
  case 'demo':
    sourceMap = config.demo.cssSourceMap
    break;
  default:
    sourceMap = false
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: !isDev
  })
}
