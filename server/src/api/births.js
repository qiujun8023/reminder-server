const _ = require('lodash')

const errors = require('../lib/errors')
const birthService = require('../service/birth')

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
    ctx.body = await birthService.findByUserIdAsync(userId)
  },

  async create (ctx) {
    let { userId } = ctx.session.user

    let filter = ['title', 'type', 'date']
    let data = Object.assign({ userId }, _.pick(ctx.request.body, filter))

    ctx.body = await birthService.createAsync(data)
    ctx.status = 201
  },

  async update (ctx) {
    let { userId } = ctx.session.user
    let { birthId } = ctx.params

    let filter = ['title', 'type', 'date']
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
