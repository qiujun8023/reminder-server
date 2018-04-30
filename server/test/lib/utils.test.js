const moment = require('moment')
const solarLunar = require('solarlunar')
const { expect } = require('chai')

const utils = require('../../src//lib/utils')

describe('lib/utils', () => {
  let nMement = moment()
  let yMement = moment().subtract(1, 'days')
  let tMoment = moment().add(1, 'days')
  let lyMoment = moment().subtract(1, 'year')
  let lmyMoment = moment().subtract(1, 'year').add(1, 'days')
  let today = solarLunar.solar2lunar(nMement.year(), nMement.month() + 1, nMement.date())
  let yesterday = solarLunar.solar2lunar(yMement.year(), yMement.month() + 1, yMement.date())
  let tomorrow = solarLunar.solar2lunar(tMoment.year(), tMoment.month() + 1, tMoment.date())
  let lastYear = solarLunar.solar2lunar(lyMoment.year(), lyMoment.month() + 1, lyMoment.date())
  let lastYearMore = solarLunar.solar2lunar(lmyMoment.year(), lmyMoment.month() + 1, lmyMoment.date())

  describe('sortBirths', () => {
    it('should sort birth success', () => {
      let births = utils.sortBirths([
        {
          birthId: 1,
          info: {
            countdown: 20,
            age: 5
          }
        }, {
          birthId: 2,
          info: {
            countdown: 20,
            age: 6
          }
        }, {
          birthId: 3,
          info: {
            countdown: 18,
            age: 5
          }
        }
      ])
      expect(births[0].birthId).to.equal(3)
      expect(births[2].birthId).to.equal(2)
    })
  })

  describe('solarDateCompare', () => {
    it('should return -1 if compare today and yesterday', () => {
      let res = utils.solarDateCompare(today, yesterday)
      expect(res).to.equal(1)
    })

    it('should return 0 if compare today and today', () => {
      let res = utils.solarDateCompare(today, today)
      expect(res).to.equal(0)
    })

    it('should return -1 if compare today and tomorrow', () => {
      let res = utils.solarDateCompare(today, tomorrow)
      expect(res).to.equal(-1)
    })
  })

  describe('lunarDateCompare', () => {
    it('should return -1 if compare today and yesterday', () => {
      let res = utils.lunarDateCompare(today, yesterday)
      expect(res).to.equal(1)
    })

    it('should return 0 if compare today and today', () => {
      let res = utils.lunarDateCompare(today, today)
      expect(res).to.equal(0)
    })

    it('should return -1 if compare today and tomorrow', () => {
      let res = utils.lunarDateCompare(today, tomorrow)
      expect(res).to.equal(-1)
    })
  })

  describe('getSolarAge', () => {
    it('should return 1', () => {
      let res = utils.getSolarAge(today, lastYear)
      expect(res).to.equal(1)
    })

    it('should return 0', () => {
      let res = utils.getSolarAge(today, lastYearMore)
      expect(res).to.equal(0)
    })
  })

  describe('getSolarCountdowm', () => {
    it('should return 1', () => {
      let res = utils.getLunarCountdown(today, tomorrow)
      expect(res).to.equal(1)
    })

    it('should return the length of this year', () => {
      let res = utils.getSolarCountdowm(today, yesterday)
      expect(res).to.equal(nMement.isLeapYear() ? 365 : 364)
    })
  })

  describe('getLunarCountdown', () => {
    it('should return 1', () => {
      let res = utils.getLunarCountdown(today, tomorrow)
      expect(res).to.equal(1)
    })

    it('should return the length of this year', () => {
      let res = utils.getLunarCountdown(today, yesterday)
      let tmp = solarLunar.lunar2solar(yesterday.lYear + 1, yesterday.lMonth, yesterday.lDay)
      let diff = moment([tmp.cYear, tmp.cMonth - 1, tmp.cDay]).diff(yMement, 'days')
      expect(res).to.equal(diff)
    })
  })

  describe('formatBirth', () => {
    it('should format birth success', () => {
      let date = `${nMement.year - 1}-${nMement.month}-${nMement.day}`
      let birth1 = utils.getBirthInfo({
        birthId: 1,
        title: 'test',
        type: 'SOLAR',
        date
      })
      let birth2 = utils.getBirthInfo({
        birthId: 1,
        title: 'test',
        type: 'LUNAR',
        date
      })
      let keys = ['year', 'month', 'day', 'zodiac', 'age', 'countdown', 'constellation', 'days']
      expect(birth1).to.include.keys(keys)
      expect(birth2).to.include.keys(keys)
    })
  })
})
