const _ = require('lodash')
const config = require('config')

const utils = require('../lib/utils')
const wechat = require('../lib/wechat')

const BASE_URL = config.get('server.baseUrl')
const BG_IMAGE = config.get('wechat.bgImage')

exports._getBirthUrl = (birth) => {
  return _.trimEnd(BASE_URL, '/') + '/#/' + birth.birthId
}

exports._getOneBirthRemindArticles = (birth) => {
  let description
  if (birth.info.countdown === 0) {
    description = `今天是 ${birth.title} 的 ${birth.info.age} 周岁 生日，不要忘了送上你的生日祝福哟。`
  } else {
    description = `还有 ${birth.info.countdown} 天就是 ${birth.title} 的 ${birth.info.age + 1} 周岁生日了，记得做好准备并送上你的祝福哟。`
  }

  return [{
    title: '生日提醒',
    picurl: BG_IMAGE,
    url: exports._getBirthUrl(birth),
    description
  }]
}

exports._getMultipleBirthRemindArticles = (births) => {
  let articles = [{
    title: '少年，你记住小伙伴们的生日了吗',
    picurl: BG_IMAGE,
    url: BASE_URL
  }]

  births = utils.sortBirths(births)
  for (let birth of births) {
    let title
    if (birth.info.countdown === 0) {
      title = `今天是 ${birth.title}[${birth.info.age}周岁] 生日哟！`
    } else {
      title = `距离 ${birth.title}[${birth.info.age + 1}周岁] 生日只有 ${birth.info.countdown} 天了`
    }

    articles.push({
      title,
      url: exports._getBirthUrl(birth)
    })

    if (articles.length > 5) {
      articles.push({
        title: '点击查看全部 >>',
        url: BASE_URL
      })
      break
    }
  }
  return articles
}

exports.sendRemindMessageAsync = async (userId, births) => {
  let articles
  if (births.length === 1) {
    articles = exports._getOneBirthRemindArticles(births[0])
  } else {
    articles = exports._getMultipleBirthRemindArticles(births)
  }

  return wechat.sendAsync({
    touser: userId
  }, {
    msgtype: 'news',
    news: {
      articles
    }
  })
}
