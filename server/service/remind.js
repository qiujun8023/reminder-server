'use strict'

const _ = require('lodash')
const moment = require('moment')

const models = require('../model')

let SettingModel = models.Setting
let RemindModel = models.Remind

// 添加提醒
exports.addAsync = function* (settingId) {
  let setting = yield SettingModel.findById(settingId)
  if (!setting) {
    return false
  }

  let remind = yield setting.createRemind()
  return remind.get({plain: true})
}

// 获取未完成提醒
exports.findNowAsync = function* () {
  let reminds = yield RemindModel.findAll({
    include: [{
      model: SettingModel,
      where: {
        time: {
          $lte: moment().format('HH:mm:ss')
        }
      }
    }],
    where: {
      isRemind: 'N',
      createdAt: {
        $gte: moment().subtract(1, 'day').toDate()
      }
    }
  })

  let res = []
  for (let remind of reminds) {
    remind = remind.get({plain: true})
    res.push(remind)
  }
  return res
}

// 更新提醒
exports.updateAsync = function* (remindId, data) {
  let remind = yield RemindModel.findById(remindId)
  if (!remind) {
    return false
  }

  data = _.pick(data, ['isRemind'])
  remind = yield remind.update(data)
  return remind.get({plain: true})
}
