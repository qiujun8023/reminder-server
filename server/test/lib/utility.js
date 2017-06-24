'use strict'

const _ = require('lodash')

const random = require('./random')
const {User, Birth, Setting} = require('../../service')

exports.createTestUserAsync = function* (opts) {
  let data = _.assign({
    userId: random.getUserId(),
    name: random.getUserName(),
    gender: random.getUserGender(),
    mobile: random.getUserMobile(),
    email: random.getUserEmail(),
    avatar: random.getUserAvatar()
  }, opts || {})

  return yield User.addOrUpdateAsync(data)
}

exports.removeTestUserAsync = function* (user) {
  return yield User.removeAsync(user.userId)
}

exports.createTestBirthAsync = function* (userId, opts) {
  let data = _.assign({
    title: random.getBirthTitle(),
    type: random.getBirthType(),
    date: random.getBirthDate()
  }, opts || {})

  return yield Birth.addAsync(userId, data)
}

exports.removeTestBirthAsync = function* (birth) {
  return yield Birth.removeAsync(birth.birthId)
}

exports.createTestSettingAsync = function* (birthId, opts) {
  let data = _.assign({
    advance: random.getSettingAdvance(),
    time: random.getSettingTime()
  }, opts || {})

  return yield Setting.addAsync(birthId, data)
}

exports.removeTestSettingAsync = function* (setting) {
  return yield Setting.removeAsync(setting.settingId)
}
