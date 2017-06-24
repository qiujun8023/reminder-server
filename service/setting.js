'use strict'

const _ = require('lodash')

const models = require('../model')
const sequelize = require('../lib/sequelize')

let BirthModel = models.Birth
let SettingModel = models.Setting
let RemindModel = models.Remind

// 添加设置
exports.addAsync = function* (birthId, data) {
  let birth = yield BirthModel.findById(birthId)
  if (!birth) {
    return false
  }

  data = _.pick(data, ['advance', 'time'])
  let setting = yield birth.createSetting(data)
  return setting.get({plain: true})
}

// 获取设置
exports.getAsync = function* (settingId) {
  let setting = yield SettingModel.findById(settingId)
  if (!setting) {
    return false
  }

  return setting.get({plain: true})
}

// 查询设置
exports.findAsync = function* (birthId) {
  let settings = yield SettingModel.findAll({
    where: {birthId}
  })

  let res = []
  for (let setting of settings) {
    setting = setting.get({plain: true})
    res.push(setting)
  }

  return res
}

// 修改提醒
exports.updateAsync = function* (settingId, data) {
  let setting = yield SettingModel.findById(settingId)
  if (!setting) {
    return false
  }

  data = _.pick(data, ['advance', 'time'])
  setting = yield setting.update(data)
  return setting.get({plain: true})
}

// 删除设置
exports.removeAsync = function* (settingId, transaction) {
  let setting = yield SettingModel.findById(settingId)
  if (!setting) {
    return false
  }

  let remove = function (t) {
    // 删除提醒
    return RemindModel.destroy({
      where: {settingId: setting.settingId},
      transaction: t
    }).then(function () {
      // 删除设置
      return setting.destroy({transaction: t})
    })
  }

  if (transaction) {
    return remove(transaction)
  }

  return sequelize.transaction(function (t) {
    return remove(t)
  })
}
