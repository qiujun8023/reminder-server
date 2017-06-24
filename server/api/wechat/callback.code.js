'use strict'

const config = require('config')
const ko = require('express-ko')
const wechat = require('wechat-enterprise')

const {Birth} = require('../../service')

// 微信配置信息
let wechatConfig = {
  corpId: config.wechat.corpid,
  token: config.wechat.token,
  encodingAESKey: config.wechat.aeskey
}

let router = module.exports = {}

let getRecentAsync = function* (userId) {
  let articles = [{
    picurl: config.wechat.cover,
    url: config.baseUrl
  }]

  let births = yield Birth.findAsync(userId)
  if (!births.length) {
    Object.assign(articles[0], {
      title: '生日提醒',
      description: '哟！少年，你居然还没记录过生日。',
      url: config.baseUrl + 'add'
    })
    return articles
  }

  let birthToday = 0
  for (let i = 0; i < births.length; i++) {
    let title
    let birth = births[i]
    if (birth.countdown === 0) {
      birthToday++
      title = `今天是 ${birth.title}[${birth.age}周岁] 生日哟！`
    } else {
      title = `距离 ${birth.title}[${birth.age + 1}周岁] 生日只有 ${birth.countdown} 天了`
    }

    // 最多添加五条记录
    if (birthToday < 6) {
      articles.push({title, url: config.baseUrl + birth.birth_id})
    }
  }

  if (birthToday === 0) {
    articles[0].title = '今天还没有小伙伴过生日哟'
  } else {
    articles[0].title = `今天有 ${birthToday} 位小伙伴过生日呢`
    if (birthToday >= articles.length) {
      articles.push({
        title: '点击查看全部 >>',
        url: config.baseUrl
      })
    }
  }

  return articles
}

// 微信点击事件消息处理
let clickEventHanderAsync = function* (req) {
  switch (req.EventKey) {
    case 'recent':
      return yield getRecentAsync(req.FromUserName)
  }
}

// 微信事件消息处理
let eventHandlerAsync = function* (req) {
  switch (req.Event) {
    case 'click':
      return yield clickEventHanderAsync(req)
  }
}

// 微信消息处理
let handlerAsync = function* (req, res) {
  let answer
  switch (req.weixin.MsgType) {
    case 'event':
      answer = yield eventHandlerAsync(req.weixin)
      break
  }

  res.reply(answer)
}

router.post = router.get = function* (req, res, next) {
  if (req.isSwitchOn('wechat')) {
    req.weixin = req.body
    // 防止返回值检查
    res.reply = function (data) {
      res.set('Content-Type', 'application/json')
      res.send(JSON.stringify(data))
    }
    yield handlerAsync(req, res)
    return
  }
  wechat(wechatConfig, ko(handlerAsync))(req, res, next)
}
