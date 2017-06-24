'use strict'

const _ = require('lodash')

module.exports = function (data) {
  let filter = [
    'birthId',
    'title',
    'type',
    'year',
    'month',
    'day',
    'days',
    'date',
    'zodiac',
    'age',
    'countdown',
    'constellation'
  ]
  return _.pick(data, filter)
}
