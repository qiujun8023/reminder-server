const { Birth, Setting } = require('../model')
const settingSerivce = require('./setting')

exports.createAsync = async (data) => {
  return Birth.create(data)
}

exports.getAsync = async (birthId) => {
  return Birth.findById(birthId)
}

exports.findByUserIdAsync = async (userId) => {
  return Birth.findAll({
    where: {userId}
  })
}

exports.updateAsync = async (birthId, data) => {
  let birth = await Birth.findById(birthId)
  if (!birth) {
    return false
  }

  return birth.update(data)
}

exports.removeWithSettingAsync = async (birthId) => {
  let birth = await Birth.findById(birthId)
  if (!birth) {
    return false
  }

  let settings = await birth.getSettings()
  for (let setting of settings) {
    await settingSerivce.removeWithRemindAsync(setting.settingId)
  }
  return birth.destroy()
}

exports.findWithSettingAsync = async (where, offset, limit) => {
  return Birth.findAll({
    where,
    include: [ Setting ],
    offset,
    limit
  })
}
