'use strict'

const _ = require('lodash')

module.exports = function (data) {
  let filter = ['settingId', 'advance', 'time']
  return _.pick(data, filter)
}
