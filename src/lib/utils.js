const _ = require('lodash')
const moment = require('moment')
const solarLunar = require('solarlunar')
const zodiac = require('12zodiac')

// 生日排序
exports.sortBirths = (births) => {
  births.sort((a, b) => {
    if (a.info.countdown !== b.info.countdown) {
      return a.info.countdown - b.info.countdown
    }
    return a.info.age - b.info.age
  })

  return births
}

// 日期大小比较
exports.dateCompare = (tMonth, tDay, bMonth, bDay) => {
  let tNumber = tMonth * 100 + tDay
  let BNumber = bMonth * 100 + bDay
  if (tNumber === BNumber) {
    return 0
  }
  return (tNumber < BNumber) ? -1 : 1
}

// 阳历日期比较
exports.solarDateCompare = (today, birth) => {
  return exports.dateCompare(today.cMonth, today.cDay, birth.cMonth, birth.cDay)
}

// 阴历日期比较
exports.lunarDateCompare = (today, birth) => {
  return exports.dateCompare(today.lMonth, today.lDay, birth.lMonth, birth.lDay)
}

// 计算年龄
exports.getAge = (tYear, bYear, compare) => {
  let age = tYear - bYear
  return (compare === -1) ? age - 1 : age
}

// 计算阳历年龄
exports.getSolarAge = (today, birth) => {
  let compare = exports.solarDateCompare(today, birth)
  return exports.getAge(today.cYear, birth.cYear, compare)
}

// 计算阴历年龄
exports.getLunarAge = (today, birth) => {
  let compare = exports.lunarDateCompare(today, birth)
  return exports.getAge(today.lYear, birth.lYear, compare)
}

// 计算倒计时
exports.getCountdown = (tDate, bDate) => {
  let tDateArr = [tDate.year, tDate.month - 1, tDate.day]
  let bDateArr = [bDate.year, bDate.month - 1, bDate.day]
  return moment(bDateArr).diff(moment(tDateArr), 'days')
}

// 计算阳历倒计时
exports.getSolarCountdowm = (today, birth) => {
  let compare = exports.solarDateCompare(today, birth)
  return exports.getCountdown({
    year: today.cYear,
    month: today.cMonth,
    day: today.cDay
  }, {
    year: (compare === 1) ? today.cYear + 1 : today.cYear,
    month: birth.cMonth,
    day: birth.cDay
  })
}

// 计算阴历倒计时
exports.getLunarCountdown = (today, birth) => {
  let tDate = {
    year: today.cYear,
    month: today.cMonth,
    day: today.cDay
  }

  // 计算下一个生日
  let nextBirthday
  let compare = exports.lunarDateCompare(today, birth)
  if (compare !== 1) {
    nextBirthday = solarLunar.lunar2solar(today.lYear, birth.lMonth, birth.lDay)
  } else {
    nextBirthday = solarLunar.lunar2solar(today.lYear + 1, birth.lMonth, birth.lDay)
  }

  // 计算倒计时
  let countdown = exports.getCountdown(tDate, {
    year: nextBirthday.cYear,
    month: nextBirthday.cMonth,
    day: nextBirthday.cDay
  })

  // 受闰月影响
  if (countdown < 0) {
    if (solarLunar.leapMonth(today.lYear) === birth.lMonth) {
      countdown += solarLunar.leapDays(today.lYear)
    }
  }

  return countdown
}

exports.getConstellation = (birthday) => {
  return zodiac(birthday.cMonth, birthday.cDay, 'zh-cn')
}

exports.getDays = (birthday) => {
  return moment().diff([birthday.cYear, birthday.cMonth - 1, birthday.cDay], 'days')
}

// 格式化阳历生日
exports.getSolarBirthInfo = (today, birthday) => {
  return {
    year: birthday.cYear + '年',
    month: birthday.cMonth + '月',
    day: birthday.cDay + '日',
    zodiac: birthday.animal,
    age: exports.getSolarAge(today, birthday),
    countdown: exports.getSolarCountdowm(today, birthday),
    constellation: exports.getConstellation(birthday),
    days: exports.getDays(birthday)
  }
}

// 格式化阴历生日
exports.getLunarBirthInfo = (today, birthday) => {
  return {
    year: birthday.yearCn,
    month: birthday.monthCn,
    day: birthday.dayCn,
    zodiac: birthday.animal,
    age: exports.getLunarAge(today, birthday),
    countdown: exports.getLunarCountdown(today, birthday),
    constellation: exports.getConstellation(birthday),
    days: exports.getDays(birthday)
  }
}

// 格式化生日
exports.getBirthInfo = (birtyDate, type) => {
  let now = moment()
  let nowDateArr = [now.year(), now.month() + 1, now.date()]
  let birthDateArr = _.split(birtyDate, '-').map(_.toInteger)

  let today = solarLunar.solar2lunar.apply(solarLunar, nowDateArr)
  if (type === 'SOLAR') {
    let birthday = solarLunar.solar2lunar.apply(solarLunar, birthDateArr)
    return exports.getSolarBirthInfo(today, birthday)
  } else {
    let birthday = solarLunar.lunar2solar.apply(solarLunar, birthDateArr)
    return exports.getLunarBirthInfo(today, birthday)
  }
}
