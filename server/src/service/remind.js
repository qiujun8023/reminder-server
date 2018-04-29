const moment = require('moment')
const { Op } = require('sequelize')

const { Birth, Setting, Remind } = require('../model')

exports.createAsync = async (data) => {
  return Remind.create(data)
}

exports.findAsync = async (where) => {
  return Remind.findAll({ where })
}

exports.updateAsync = async (remindId, data) => {
  let remind = await Remind.findById(remindId)
  if (!remind) {
    return false
  }

  return remind.update(data)
}

exports.setReminded = async (remindIds) => {
  for (let remindId of remindIds) {
    await exports.updateAsync(remindId, {
      isRemind: true
    })
  }
}

exports.findNeedRemindAsync = async () => {
  return Remind.findAll({
    include: [{
      model: Setting,
      where: {
        time: {
          [Op.lte]: moment().format('HH:mm:ss')
        }
      },
      required: true
    }, {
      model: Birth,
      required: true
    }],
    where: {
      isRemind: false
    }
  })
}
