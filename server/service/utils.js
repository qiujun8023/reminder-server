'use strict'

const _ = require('lodash')
const moment = require('moment')
const solarLunar = require('solarlunar')
const constellation = require('node-constellation')

let utils = module.exports = {}

// 生日排序
utils.sortBirths = function (births) {
  births.sort(function (a, b) {
    if (a.countdown !== b.countdown) {
      return a.countdown - b.countdown
    }
    return a.age - b.age
  })

  return births
}

// 日期大小比较
utils.dateCompare = function (today, birth, type) {
  if (type === 'SOLAR') {
    today = today.cMonth * 100 + today.cDay
    birth = birth.cMonth * 100 + birth.cDay
  } else {
    today = today.lMonth * 100 + today.lDay
    birth = birth.lMonth * 100 + birth.lDay
  }

  return (today === birth) ? 0
    : (today < birth) ? -1 : 1
}

// 计算年龄
utils.getAge = function (today, birth, type) {
  let compare = this.dateCompare(today, birth, type)

  // 计算年龄
  let age
  if (type === 'SOLAR') {
    age = today.cYear - birth.cYear
  } else {
    age = today.lYear - birth.lYear
  }

  // 今年未过生日，减去
  if (compare === -1) {
    return age - 1
  }

  return age
}

// 计算倒计时
utils.getCountdown = function (today, birth, type) {
  let nextBirthday
  let compare = this.dateCompare(today, birth, type)

  if (type === 'SOLAR') {
    nextBirthday = [today.cYear, birth.cMonth, birth.cDay]
    if (compare === 1) {
      nextBirthday[0]++
    }
  } else {
    let tmpDate = [today.lYear, birth.lMonth, birth.lDay]
    if (compare === 1) {
      tmpDate[0]++
    }
    let tmpData = solarLunar.lunar2solar.apply(this, tmpDate)
    nextBirthday = [tmpData.cYear, tmpData.cMonth, tmpData.cDay]
  }

  // nodejs 月份从 0 开始
  nextBirthday[1]--

  // 计算日期差
  let tmp = moment([today.cYear, today.cMonth - 1, today.cDay])
  let countdown = moment(nextBirthday).diff(tmp, 'days')

  // 受闰月影响
  if (countdown < 0 && type !== 'SOLAR') {
    if (solarLunar.leapMonth(today.lYear) === birth.lMonth) {
      countdown += solarLunar.leapDays(today.lYear)
    }
  }

  return countdown
}

// 格式化生日
utils.formatBirth = function (birth) {
  let now = moment()
  let nowDate = [now.year(), now.month() + 1, now.date()]
  let today = solarLunar.solar2lunar.apply(this, nowDate)

  // 获取出生时的阳历与阴历
  let data
  let birthDate = _.split(birth.date, '-').map(_.toInteger)
  if (birth.type === 'SOLAR') {
    data = solarLunar.solar2lunar.apply(this, birthDate)
    birth.year = data.cYear
    birth.month = data.cMonth
    birth.day = data.cDay
  } else {
    data = solarLunar.lunar2solar.apply(this, birthDate)
    birth.year = data.lYear
    birth.month = data.monthCn
    birth.day = data.dayCn
  }

  // 设置属性/年龄/倒计时/星座
  birth.zodiac = data.animal
  birth.age = this.getAge(today, data, birth.type)
  birth.countdown = this.getCountdown(today, data, birth.type)
  birth.constellation = constellation(data.cMonth, data.cDay, 'zh-cn')
  birth.days = moment().diff([data.cYear, data.cMonth - 1, data.cDay], 'days')

  return birth
}
