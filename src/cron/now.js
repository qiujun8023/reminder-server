const _ = require('lodash')

const logger = require('../lib/logger')
const userService = require('../service/user')
const remindService = require('../service/remind')
const wechatService = require('../service/wechat')

module.exports = async () => {
  let needRemind = {}
  let reminds = await remindService.findNeedRemindAsync()
  for (let remind of reminds) {
    let {setting, birth} = remind

    // 异常数据直接设置为已提醒
    if (birth.info.countdown !== setting.advance) {
      logger.error(`remind error, countdown: ${birth.info.countdown}, advance: ${setting.advance}`)
      await remindService.setReminded([remind.remindId])
      continue
    }

    needRemind[birth.userId] = needRemind[birth.userId] || []
    needRemind[birth.userId].push(remind)
  }

  for (let userId in needRemind) {
    let births = _.map(needRemind[userId], 'birth')
    let remindIds = _.map(needRemind[userId], 'remindId')
    let { username } = await userService.getAsync(userId)
    await wechatService.sendRemindMessageAsync(username, births)
    await remindService.setReminded(remindIds)
  }
}
