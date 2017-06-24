'use strict'

const _ = require('lodash')

const models = require('../model')

let UserModel = models.User

// 添加日志
exports.addAsync = function* (userId, data) {
  let user = yield UserModel.findById(userId)
  if (!user) {
    return false
  }

  data = _.pick(data, ['content'])
  let log = yield user.createLog(data)
  return log.get({plain: true})
}
