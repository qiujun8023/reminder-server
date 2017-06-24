'use strict'

const config = require('config')

const cron = require('../lib/cron')
const wechat = require('../lib/wechat')
const {Birth, Remind, Log, Utils} = require('../service')

// 设置已提醒
let _setIsRemind = function* (remindIds) {
  for (let remindId of remindIds) {
    yield Remind.updateAsync(remindId, {isRemind: true})
  }
}

// 发送图文消息
let _sendNewsMessage = function* (userId, articles) {
  let to = {touser: userId}
  let message = {
    msgtype: 'news',
    news: {articles}
  }
  yield wechat.sendAsync(to, message)
  yield Log.addAsync(userId, {content: JSON.stringify(message)})
  return true
}

// 发送提醒给用户
let _remindUserAysnc = function* (needRemind) {
  for (let userId in needRemind) {
    // 获取排序后的生日提醒列表
    let births = Utils.sortBirths(needRemind[userId])

    let articles = []
    let remindIds = []
    let isOverflow = false
    for (let i = 0; i < births.length; i++) {
      let birth = births[i]
      remindIds.push(birth.remindId)

      // 单个提醒
      if (births.length === 1) {
        let article = {
          title: '生日提醒',
          picurl: config.wechat.cover,
          url: config.baseUrl + birth.birthId
        }
        if (birth.countdown === 0) {
          article.description =
            `今天是 ${birth.title} 的 ${birth.age} 周岁 生日，不要忘了送上你的生日祝福哟。`
        } else {
          article.description = `还有 ${birth.countdown} 天就是 ${birth.title} 的` +
                                `${birth.age + 1} 周岁生日了，记得做好准备并送上你的祝福哟。`
        }
        articles.push(article)
        break
      }

      // 多个提醒
      let title
      if (birth.countdown === 0) {
        title = `今天是 ${birth.title}[${birth.age}周岁] 生日哟！`
      } else {
        title = `距离 ${birth.title}[${birth.age + 1}周岁] 生日只有 ${birth.countdown} 天了`
      }

      // 最多添加五条记录
      if (i < 5) {
        articles.push({title, url: config.baseUrl + birth.birthId})
      } else {
        isOverflow = true
      }
    }

    if (isOverflow) {
      articles.push({
        title: '点击查看全部 >>',
        url: config.baseUrl
      })
    }

    if (births.length !== 1) {
      articles.unshift({
        title: '少年，你记住小伙伴们的生日了吗',
        picurl: config.wechat.cover,
        url: config.baseUrl
      })
    }

    if (yield _sendNewsMessage(userId, articles)) {
      yield _setIsRemind(remindIds)
    }
  }
}

// 获取当前提醒列表
let _now = function* () {
  let needRemind = {}
  let reminds = yield Remind.findNowAsync()
  for (let remind of reminds) {
    let setting = remind.setting
    let birth = yield Birth.getAsync(setting.birthId)

    // 异常数据直接标注已提醒
    if (birth.countdown !== setting.advance) {
      yield _setIsRemind([remind.remindId])
      continue
    }

    // 添加到待提醒列表
    if (!needRemind[birth.userId]) {
      needRemind[birth.userId] = []
    }
    birth.remindId = remind.remindId
    needRemind[birth.userId].push(birth)
  }

  return yield _remindUserAysnc(needRemind)
}

module.exports = cron('0 * * * * *', _now)
