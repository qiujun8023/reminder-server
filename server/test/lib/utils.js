const _ = require('lodash')

const random = require('./random')
const userService = require('../../src/service/user')
const birthService = require('../../src/service/birth')
const settingService = require('../../src/service/setting')

exports.setUserSession = (user) => {
  return (req) => {
    req.set('x-user-id', user.userId)
  }
}

exports.createTestUserAsync = async (opts) => {
  let data = _.assign({
    username: random.getUsername(),
    nickname: random.getNickname()
  }, opts || {})

  return userService.createAsync(data)
}

exports.removeTestUserAsync = async (user) => {
  return userService.removeWithBirthAsync(user.userId)
}

exports.createTestBirthAsync = async (userId, opts) => {
  let data = _.assign({
    userId,
    title: random.getBirthTitle(),
    type: random.getBirthType(),
    date: random.getBirthDate(),
    color: random.getBirthColor()
  }, opts || {})

  return birthService.createAsync(data)
}

exports.removeTestBirthAsync = async (birth) => {
  return birthService.removeWithSettingAsync(birth.birthId)
}

exports.createTestSettingAsync = async (userId, birthId, opts) => {
  let data = _.assign({
    userId,
    birthId,
    advance: random.getSettingAdvance(),
    time: random.getSettingTime()
  }, opts || {})

  return settingService.createAsync(data)
}

exports.removeTestSettingAsync = async (setting) => {
  return settingService.removeWithRemindAsync(setting.birthId)
}
