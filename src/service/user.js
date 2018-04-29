const { User } = require('../model')

exports.createAsync = async (data) => {
  return User.create(data)
}

exports.getAsync = async (userId) => {
  return User.findById(userId)
}

exports.getByUserNameAsync = async (username) => {
  return User.findOne({
    where: { username }
  })
}

exports.updateAsync = async (userId, data) => {
  let user = await User.findById(userId)
  if (!user) {
    return false
  }

  return user.update(data)
}

exports.removeAsync = async (userId) => {
  let user = await User.findById(userId)
  if (!user) {
    return false
  }

  return user.destroy()
}
