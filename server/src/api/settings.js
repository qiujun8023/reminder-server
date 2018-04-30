const _ = require('lodash')

const errors = require('../lib/errors')
const birthService = require('../service/birth')
const settingService = require('../service/setting')

let getAndCheckBirthAsync = async (userId, birthId) => {
  let birth = await birthService.getAsync(birthId)
  if (!birth || birth.userId !== userId) {
    throw new errors.NotFound('未找到相关生日')
  }
  return birth
}

let getAndCheckSettingAsync = async (settingId, userId) => {
  let setting = await settingService.getAsync(settingId)
  if (!setting) {
    throw new errors.NotFound('未找到相关提醒设置')
  }

  await getAndCheckBirthAsync(userId, setting.birthId)

  return setting
}

module.exports = {
  async detail (ctx) {
    let { userId } = ctx.session.user
    let { settingId } = ctx.params

    ctx.body = await getAndCheckSettingAsync(settingId, userId)
  },

  async list (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.request.query

    // 判断所有权
    await getAndCheckBirthAsync(userId, birthId)

    ctx.body = await settingService.findByBirthIdAsync(birthId)
  },

  async create (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.request.body

    // 检查所有权
    await getAndCheckBirthAsync(userId, birthId)

    let filter = ['advance', 'time']
    let data = Object.assign({ birthId }, _.pick(ctx.request.body, filter))

    ctx.body = await settingService.createAsync(data)
    ctx.status = 201
  },

  async update (ctx) {
    let { userId } = ctx.session.user
    let { settingId } = ctx.params

    // 检查所有权
    await getAndCheckSettingAsync(settingId, userId)

    let filter = ['advance', 'time']
    let data = _.pick(ctx.request.body, filter)

    ctx.body = await settingService.updateAsync(settingId, data)
  },

  async remove (ctx) {
    let { userId } = ctx.session.user
    let { settingId } = ctx.params

    // 检查所有权
    await getAndCheckSettingAsync(settingId, userId)

    await settingService.removeWithRemindAsync(settingId)
    ctx.body = { success: true }
  }
}
