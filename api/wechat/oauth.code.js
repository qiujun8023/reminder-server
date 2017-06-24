'use strict'

const _ = require('lodash')
const errors = require('../../lib/errors')
const wechat = require('../../lib/wechat')
const {User} = require('../../service')

module.exports = {
  *get (req, res) {
    let {code, state} = req.query

    let userId
    try {
      let user = yield wechat.getUserIdByCodeAsync(code)
      userId = user.UserId
    } catch (err) {
      throw new errors.BadRequest(err.message)
    }

    let user
    try {
      user = yield wechat.getUserAsync(userId)
      if (user.gender === '1') {
        user.gender = '男'
      } else if (user.gender === '2') {
        user.gender = '女'
      } else {
        user.gender = '未知'
      }
      user = _.pick(user, ['name', 'gender', 'mobile', 'email', 'avatar'])
      user.userId = userId
    } catch (err) {
      throw new errors.BadGateway(err.message || '请求微信服务器失败')
    }

    req.session.user = yield User.addOrUpdateAsync(user)
    res.redirect(state || '/')
  }
}
