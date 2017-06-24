'use strict'

const co = require('co')

const models = require('../model')
const sequelize = require('../lib/sequelize')
const Birth = require('./birth')

let UserModel = models.User

// 添加或更新用户
exports.addOrUpdateAsync = function* (data) {
  yield UserModel.upsert(data, {
    fields: ['userId', 'name', 'gender', 'mobile', 'email', 'avatar']
  })
  return yield this.getAsync(data.userId)
}

// 获取用户
exports.getAsync = function* (userId) {
  let user = yield UserModel.findById(userId)
  if (!user) {
    return false
  }

  return user.get({plain: true})
}

// 删除用户
exports.removeAsync = function* (userId) {
  let user = yield UserModel.findById(userId)
  if (!user) {
    return false
  }

  return sequelize.transaction(function (t) {
    return co(function* () {
      let births = yield user.getBirths()
      for (let birth of births) {
        yield Birth.removeAsync(birth.birthId, t)
      }
      // 删除生日
      return user.destroy({transaction: t})
    })
  })
}
