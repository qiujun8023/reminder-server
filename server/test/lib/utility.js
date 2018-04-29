
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

  return await User.addOrUpdateAsync(data)
}

exports.removeTestUserAsync = function* (user) {
  return await User.removeAsync(user.userId)
}

exports.createTestBirthAsync = function* (userId, opts) {
  let data = _.assign({
    title: random.getBirthTitle(),
    type: random.getBirthType(),
    date: random.getBirthDate()
  }, opts || {})

  return await Birth.addAsync(userId, data)
}

exports.removeTestBirthAsync = function* (birth) {
  return await Birth.removeAsync(birth.birthId)
}

exports.createTestSettingAsync = function* (birthId, opts) {
  let data = _.assign({
    advance: random.getSettingAdvance(),
    time: random.getSettingTime()
  }, opts || {})

  return await Setting.addAsync(birthId, data)
}

exports.removeTestSettingAsync = function* (setting) {
  return await Setting.removeAsync(setting.settingId)
}
