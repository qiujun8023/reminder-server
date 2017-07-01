'use strict'

module.exports = {
  env: 'test',

  redis: {
    host: 'localhost',
    port: 6379,
    keyPrefix: 'birthday:'
  },

  mysql: {
    poolSize: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'birthday',
    timezone: '+08:00'
  }
}
