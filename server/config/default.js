'use strict'

const path = require('path')

const pkg = require('../package')

module.exports = {
  host: 'localhost',
  port: '8002',
  baseUrl: 'http://localhost:8002/',

  env: 'development',

  swagger: {
    info: {
      version: pkg.version
    }
  },

  session: {
    secret: 'birthday secret',
    name: 'SESSION'
  },

  redis: {
    host: 'localhost',
    port: 6379,
    keyPrefix: 'birthday:'
  },

  mysql: {
    poolSize: 5,
    host: 'localhost',
    user: 'birthday',
    password: 'password',
    database: 'birthday',
    timezone: '+08:00'
  },

  wechat: {
    corpid: 'wx4e2c2b771c467c9f',
    secret: 'k7TGD8xJLDU6-sPH3NwY0eTs2oBPyAINMdbSbGN80fuEt01UK0Z8dWzhm7crgkz7',
    agentid: 0,
    token: 'mRoQySqj2XBEORdnuOh9wei17',
    aeskey: '6mRfWp9o1dfXHnmRBCFmTlpM3IIY377wy2iDJJjx4lM',
    cover: 'https://cdn.qiujun.me/images/birthday/cover.png!birthday.wechat'
  },

  clientDir: path.join(__dirname, '../../client/dist')
}
