const { Setting } = require('../model')

exports.createAsync = async (data) => {
  return Setting.create(data)
}

exports.getAsync = async (settingId) => {
  return Setting.findById(settingId)
}

exports.findByBirthIdAsync = async (birthId) => {
  return Setting.findAll({
    where: { birthId }
  })
}

exports.updateAsync = async (settingId, data) => {
  let setting = await Setting.findById(settingId)
  if (!setting) {
    return false
  }

  return setting.update(data)
}

exports.removeAsync = async (settingId) => {
  let setting = await Setting.findById(settingId)
  if (!setting) {
    return false
  }

  return setting.destroy()
}
