'use strict'

const _ = require('lodash')

const cron = require('../lib/cron')
const {Birth, Remind} = require('../service')

// 判断是否当日有提醒
let getTodaySetting = function (birth) {
  for (let setting of birth.settings) {
    if (setting.advance === birth.countdown) {
      return setting
    }
  }
  return false
}

// 生成当前的提醒
let _today = function* () {
  let offset = 0
  let limit = 20

  // eslint-disable-next-line
  while (true) {
    let births = yield Birth.findWithSettingAsync(offset, limit)
    if (_.isEmpty(births)) {
      break
    }

    // 获取当日的提醒列表
    for (let birth of births) {
      let setting = getTodaySetting(birth)
      if (setting) {
        let settingId = setting.settingId
        let time = setting.time
        yield Remind.addAsync(settingId, {time})
      }
    }

    offset += limit
  }
}

module.exports = cron('0 0 0 * * *', _today)
