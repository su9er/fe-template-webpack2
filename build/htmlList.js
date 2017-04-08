const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getEntries = require('./entry')
const config = require('../config')

const options = {
  ext: 'html',
  vendor: ['vendor']
}

let envConfig = null

switch (process.env.NODE_ENV) {
  case 'production':
    envConfig = config.build
    break
  case 'debug':
    envConfig = config.debug
    break
  case 'development':
    envConfig = config.dev
    break
  case 'demo':
    envConfig = config.demo
    break;
  default:
    envConfig = config.dev
}

const entries = getEntries(path.join(__dirname, '..', 'entry/'))

const htmlList = Object.keys(entries).map(entry => {
  // 生产环境对模板进行压缩处理
  const extraOptions = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'debug' ? {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    },
    chunks: [entry].concat(options.vendor)
  } : {}
  return new HtmlWebpackPlugin(Object.assign({
    filename: path.join(envConfig.assetsRoot, `${entry}.${options.ext}`),
    template: path.join(__dirname, '..', `src/pages/${entry}.html`),
    chunks: [entry],
    inject: true
  }, extraOptions))
})

module.exports = htmlList
