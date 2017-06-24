'use strict'

const _ = require('lodash')

const errors = require('../lib/errors')
const format = require('../lib/format')
const {Birth} = require('../service')

// 判断所有权
let getAsync = function* (userId, birthId) {
  let birth = yield Birth.getAsync(birthId)
  if (!birth || birth.userId !== userId) {
    throw new errors.NotFound('未找到相关生日')
  }
  return birth
}

module.exports = {
  *get (req, res) {
    let {userId} = req.session.user
    let births = yield Birth.findAsync(userId)

    let result = []
    for (let birth of births) {
      result.push(format.birth(birth))
    }
    res.json(result)
  },

  *post (req, res) {
    let {userId} = req.session.user
    let data = _.pick(req.body, ['title', 'type', 'date'])
    let birth = yield Birth.addAsync(userId, data)
    res.status(201).json(format.birth(birth))
  },

  *put (req, res) {
    let {userId} = req.session.user
    let {birthId} = req.body
    let data = _.pick(req.body, ['title', 'type', 'date'])

    yield getAsync(userId, birthId)
    let birth = yield Birth.updateAsync(birthId, data)
    res.json(format.birth(birth))
  },

  *delete (req, res) {
    let {userId} = req.session.user
    let {birthId} = req.query

    yield getAsync(userId, birthId)
    yield Birth.removeAsync(birthId)
    res.json({result: true})
  }
}
