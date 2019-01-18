const { Setting } = require('../model')

exports.createAsync = async (data) => {
  return Setting.create(data)
}

exports.getAsync = async (settingId) => {
  return Setting.findByPk(settingId)
}

exports.findByBirthIdAsync = async (birthId) => {
  return Setting.findAll({
    where: { birthId }
  })
}

exports.updateAsync = async (settingId, data) => {
  let setting = await Setting.findByPk(settingId)
  if (!setting) {
    return false
  }

  return setting.update(data)
}

exports.removeWithRemindAsync = async (settingId) => {
  let setting = await Setting.findByPk(settingId)
  if (!setting) {
    return false
  }

  let reminds = await setting.getReminds()
  for (let remind of reminds) {
    await remind.destroy()
  }
  return setting.destroy()
}
