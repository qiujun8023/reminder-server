const { Birth, Setting } = require('../model')

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

exports.removeAsync = async (birthId) => {
  let birth = await Birth.findById(birthId)
  if (!birth) {
    return true
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
