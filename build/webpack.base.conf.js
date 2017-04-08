var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
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

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: envConfig.assetsRoot,
    filename: '[name].js',
    publicPath: envConfig.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'css': resolve('src/assets/css'),
      'components': resolve('src/components'),
      'directives': resolve('src/directives'),
      'filters': resolve('src/filters'),
      'router': resolve('src/router'),
      'services': resolve('src/services'),
      'utils': resolve('src/utils'),
      'views': resolve('src/views'),
      'vuex': resolve('src/vuex'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
