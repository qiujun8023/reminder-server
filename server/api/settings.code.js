'use strict'

const _ = require('lodash')

const errors = require('../lib/errors')
const format = require('../lib/format')
const {Birth, Setting} = require('../service')

module.exports = {
  *get (req, res) {
    let {userId} = req.session.user
    let {birthId} = req.query

    // 判断所有权
    let birth = yield Birth.getAsync(birthId)
    if (!birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关生日')
    }

    let result = []
    let settings = yield Setting.findAsync(birthId)
    for (let setting of settings) {
      result.push(format.setting(setting))
    }
    res.json(result)
  },

  *put (req, res) {
    let {userId} = req.session.user
    let {settingId} = req.body
    let data = _.pick(req.body, ['advance', 'time'])

    // 获取设置信息
    let setting = yield Setting.getAsync(settingId)
    if (!setting) {
      throw new errors.NotFound('未找到相关设置')
    }

    // 获取设置对应的生日
    let birth = yield Birth.getAsync(setting.birthId)
    if (!birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关设置')
    }

    // 更新设置
    setting = yield Setting.updateAsync(settingId, data)
    res.json(format.setting(setting))
  },

  *post (req, res) {
    let {userId} = req.session.user
    let {birthId} = req.body
    let data = _.pick(req.body, ['advance', 'time'])

    // 判断所有权
    let birth = yield Birth.getAsync(birthId)
    if (!birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关生日')
    }

    let setting = yield Setting.addAsync(birthId, data)
    res.status(201).json(format.setting(setting))
  },

  *delete (req, res) {
    let {userId} = req.session.user
    let {settingId} = req.query

    // 获取设置信息
    let setting = yield Setting.getAsync(settingId)
    if (!setting) {
      throw new errors.NotFound('未找到相关设置')
    }

    // 获取设置对应的生日
    let birth = yield Birth.getAsync(setting.birthId)
    if (!birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关设置')
    }

    // 删除设置
    yield Setting.removeAsync(settingId)
    res.json({result: true})
  }
}
