'use strict'

const co = require('co')

const models = require('../model')
const sequelize = require('../lib/sequelize')
const Utils = require('./utils')
const Setting = require('./setting')

let UserModel = models.User
let BirthModel = models.Birth
let SettingModel = models.Setting

// 添加生日
exports.addAsync = function* (userId, data) {
  let user = yield UserModel.findById(userId)
  if (!user) {
    return false
  }

  let birth = yield user.createBirth(data, {
    fields: ['title', 'type', 'date']
  })
  return Utils.formatBirth(birth.get({plain: true}))
}

// 查询生日
exports.getAsync = function* (birthId) {
  let birth = yield BirthModel.findById(birthId)
  if (!birth) {
    return false
  }

  birth = birth.get({plain: true})
  return Utils.formatBirth(birth)
}

// 获取生日
exports.findAsync = function* (userId) {
  let births = yield BirthModel.findAll({
    where: {userId}
  })

  let res = []
  for (let birth of births) {
    birth = birth.get({plain: true})
    res.push(Utils.formatBirth(birth))
  }

  return Utils.sortBirths(res)
}

// 更新生日
exports.updateAsync = function* (birthId, data) {
  let birth = yield BirthModel.findById(birthId)
  if (!birth) {
    return false
  }

  birth = yield birth.update(data, {
    fields: ['title', 'type', 'date']
  })
  birth = birth.get({plain: true})
  return Utils.formatBirth(birth)
}

// 删除生日
exports.removeAsync = function* (birthId, transaction) {
  let birth = yield BirthModel.findById(birthId)
  if (!birth) {
    return false
  }

  let remove = function (t) {
    return co(function* () {
      // 删除设置
      let settings = yield birth.getSettings()
      for (let setting of settings) {
        yield Setting.removeAsync(setting.settingId, t)
      }
      // 删除生日
      return birth.destroy({transaction: t})
    })
  }

  if (transaction) {
    return remove(transaction)
  }

  return sequelize.transaction(function (t) {
    return remove(t)
  })
}

// 查询设置/生日
exports.findWithSettingAsync = function* (offset, limit) {
  let births = yield BirthModel.findAll({
    include: [ SettingModel ],
    offset,
    limit
  })

  let res = []
  for (let birth of births) {
    birth = birth.get({plain: true})
    res.push(Utils.formatBirth(birth))
  }

  return res
}
