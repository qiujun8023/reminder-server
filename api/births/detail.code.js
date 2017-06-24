'use strict'

const errors = require('../../lib/errors')
const format = require('../../lib/format')
const {Birth} = require('../../service')

module.exports = {
  *get (req, res) {
    let {userId} = req.session.user
    let {birthId} = req.query

    let birth = yield Birth.getAsync(birthId)
    if (!birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关生日')
    }

    res.json(format.birth(birth))
  }
}
