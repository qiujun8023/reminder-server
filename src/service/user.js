const { User } = require('../model')
const birthSerivce = require('./birth')

exports.createAsync = async (data) => {
  return User.create(data)
}

exports.getAsync = async (userId) => {
  return User.findByPk(userId)
}

exports.getByUserNameAsync = async (username) => {
  return User.findOne({
    where: { username }
  })
}

exports.updateAsync = async (userId, data) => {
  let user = await User.findByPk(userId)
  if (!user) {
    return false
  }

  return user.update(data)
}

exports.removeWithBirthAsync = async (userId) => {
  let user = await User.findByPk(userId)
  if (!user) {
    return false
  }

  let births = await user.getBirths()
  for (let birth of births) {
    await birthSerivce.removeWithRemindAsync(birth.birthId)
  }
  return user.destroy()
}
