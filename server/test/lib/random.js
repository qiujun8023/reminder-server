const Chance = require('chance')
const moment = require('moment')

let chance = new Chance()

module.exports = {
  getUsername () {
    return chance.word({length: 10})
  },

  getNickname () {
    return chance.word({length: 8})
  },

  getBirthTitle () {
    return chance.word({length: 8})
  },

  getBirthType () {
    return chance.pickone(['SOLAR', 'LUNAR'])
  },

  getBirthDate () {
    let year = chance.integer({min: 1950, max: 2015})
    let day = chance.integer({min: 1, max: 28})
    let date = chance.date({year, day})
    return moment(date).format('YYYY-MM-DD')
  },

  getBirthColor () {
    return chance.color()
  },

  getSettingAdvance () {
    return chance.integer({min: 0, max: 20})
  },

  getSettingTime () {
    let hour = chance.hour({twentyfour: true})
    let minute = chance.minute()
    return `${('00' + hour).slice(-2)}:${('00' + minute).slice(-2)}:00`
  }
}
