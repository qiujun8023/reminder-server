'use strict'

const errors = require('../../lib/errors')
const format = require('../../lib/format')
const {Birth, Setting} = require('../../service')

module.exports = {
  *get (req, res) {
    let {userId} = req.session.user
    let {settingId} = req.query

    let birth
    let setting = yield Setting.getAsync(settingId)
    if (setting) {
      birth = yield Birth.getAsync(setting.birthId)
    }

    // 存在性及权限判断
    if (!setting || !birth || birth.userId !== userId) {
      throw new errors.NotFound('未找到相关提醒')
    }

    res.json(format.setting(setting))
  }
}
