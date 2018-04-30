const _ = require('lodash')

const utils = require('../lib/utils')
const errors = require('../lib/errors')
const birthService = require('../service/birth')
const settingService = require('../service/setting')

const DEFAULT_SETTING = {
  advance: 0,
  time: '12:00'
}

let getAndCheckAsync = async (userId, birthId) => {
  let birth = await birthService.getAsync(birthId)
  if (!birth || birth.userId !== userId) {
    throw new errors.NotFound('未找到相关生日')
  }
  return birth
}

module.exports = {
  async detail (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.params

    ctx.body = await getAndCheckAsync(userId, birthId)
  },

  async list (ctx) {
    let { userId } = ctx.session.user
    let births = await birthService.findByUserIdAsync(userId)
    ctx.body = utils.sortBirths(births)
  },

  async create (ctx) {
    let { userId } = ctx.session.user

    let filter = ['title', 'type', 'date', 'color']
    let data = Object.assign({ userId }, _.pick(ctx.request.body, filter))

    let birth = await birthService.createAsync(data)
    await settingService.createAsync(Object.assign({
      birthId: birth.birthId
    }, DEFAULT_SETTING))

    ctx.body = birth
    ctx.status = 201
  },

  async update (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.params

    let filter = ['title', 'type', 'date', 'color']
    let data = _.pick(ctx.request.body, filter)

    await getAndCheckAsync(userId, birthId)
    ctx.body = await birthService.updateAsync(birthId, data)
  },

  async remove (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.params

    await getAndCheckAsync(userId, birthId)
    await birthService.removeAsync(birthId)
    ctx.body = { success: true }
  }
}
