
const moment = require('moment')
const solarLunar = require('solarlunar')
const expect = require('chai').expect

const {Utils} = require('../../service')

describe('service/utils', function () {
  let now = moment()
  let nowDate = [now.year(), now.month() + 1, now.date()]
  let today = solarLunar.solar2lunar.apply(this, nowDate)

  describe('sortBirths', function () {
    it('should sort birth success', function () {
      let births = Utils.sortBirths([
        {
          birth_id: 1,
          countdown: 20,
          age: 5
        }, {
          birth_id: 2,
          countdown: 20,
          age: 6
        }, {
          birth_id: 3,
          countdown: 18,
          age: 5
        }
      ])
      expect(births[0].birth_id).to.equal(3)
      expect(births[2].birth_id).to.equal(2)
    })
  })

  describe('dateCompare', function () {
    it('should return -1 if compare today and yesterday', function () {
      let yesterday = moment().subtract(1, 'days')
      yesterday = [yesterday.year(), yesterday.month() + 1, yesterday.date()]
      yesterday = solarLunar.solar2lunar.apply(this, yesterday)
      let res1 = Utils.dateCompare(today, yesterday, 'SOLAR')
      let res2 = Utils.dateCompare(today, yesterday, 'LUNAR')
      expect(res1).to.equal(1)
      expect(res2).to.equal(1)
    })

    it('should return 0 if compare today and today', function () {
      let res1 = Utils.dateCompare(today, today, 'SOLAR')
      let res2 = Utils.dateCompare(today, today, 'LUNAR')
      expect(res1).to.equal(0)
      expect(res2).to.equal(0)
    })

    it('should return -1 if compare today and tomorrow', function () {
      let tomorrow = moment().add(1, 'days')
      tomorrow = [tomorrow.year(), tomorrow.month() + 1, tomorrow.date()]
      tomorrow = solarLunar.solar2lunar.apply(this, tomorrow)
      let res1 = Utils.dateCompare(today, tomorrow, 'SOLAR')
      let res2 = Utils.dateCompare(today, tomorrow, 'LUNAR')
      expect(res1).to.equal(-1)
      expect(res2).to.equal(-1)
    })
  })

  describe('getAge', function () {
    it('should return 1', function () {
      let lastYear = moment().subtract(1, 'year')
      lastYear = [lastYear.year(), lastYear.month() + 1, lastYear.date()]
      lastYear = solarLunar.solar2lunar.apply(this, lastYear)
      let res = Utils.getAge(today, lastYear, 'SOLAR')
      expect(res).to.equal(1)
    })

    it('should return 0', function () {
      let lastYear = moment().subtract(1, 'year').add(1, 'days')
      lastYear = [lastYear.year(), lastYear.month() + 1, lastYear.date()]
      lastYear = solarLunar.solar2lunar.apply(this, lastYear)
      let res1 = Utils.getAge(today, lastYear, 'SOLAR')
      expect(res1).to.equal(0)
    })
  })

  describe('getCountdown', function () {
    it('should return 1', function () {
      let tomorrow = moment().add(1, 'days')
      tomorrow = [tomorrow.year(), tomorrow.month() + 1, tomorrow.date()]
      tomorrow = solarLunar.solar2lunar.apply(this, tomorrow)
      let res1 = Utils.getCountdown(today, tomorrow, 'SOLAR')
      expect(res1).to.equal(1)
    })

    it('should return the length of this year', function () {
      let yesterday = moment().subtract(1, 'days')
      yesterday = [yesterday.year(), yesterday.month() + 1, yesterday.date()]
      yesterday = solarLunar.solar2lunar.apply(this, yesterday)
      let res1 = Utils.getCountdown(today, yesterday, 'SOLAR')
      let res2 = Utils.getCountdown(today, yesterday, 'LUNAR')
      let tmpData = [yesterday.lYear + 1, yesterday.lMonth, yesterday.lDay]
      tmpData = solarLunar.lunar2solar.apply(this, tmpData)
      tmpData = moment([tmpData.cYear, tmpData.cMonth - 1, tmpData.cDay])
      expect(res1).to.equal(now.isLeapYear() ? 365 : 364)
      expect(res2).to.equal(tmpData.diff(today, 'days'))
    })
  })

  describe('formatBirth', function () {
    it('should format birth success', function () {
      let date = `${now.year - 1}-${now.month}-${now.day}`
      let birth1 = Utils.formatBirth({
        birth_id: 1,
        title: 'test',
        type: 'SOLAR',
        date
      })
      let birth2 = Utils.formatBirth({
        birth_id: 1,
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
