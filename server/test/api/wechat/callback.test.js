
const expect = require('chai').expect
const moment = require('moment')

const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')

let BASE_PATH = '/api/wechat/callback'
let userPlugin = plugins.user()
let switchPlugin = plugins.switch()

describe(BASE_PATH, function () {
  let user

  before(function* () {
    user = await userPlugin.before()
  })

  after(function* () {
    await userPlugin.after()
  })

  it('should return empty with invalid content', function* () {
    let res = await api.post(BASE_PATH)
      .use(switchPlugin.plugin({wechat: true}))
      .send({
        FromUserName: user.userId,
        MsgType: 'event',
        Event: 'click',
        EventKey: 'invalid content'
      })
      .expect(200)
    expect(res.body).to.be.empty
  })

  it('should return without birth info', function* () {
    let res = await api.post(BASE_PATH)
      .use(switchPlugin.plugin({wechat: true}))
      .send({
        FromUserName: user.userId,
        MsgType: 'event',
        Event: 'click',
        EventKey: 'recent'
      })
      .expect(200)
    expect(res.body.length).to.be.equal(1)
  })

  it('should return with birth info', function* () {
    let birth1 = await utility.createTestBirthAsync(user.userId)
    let res1 = await api.post(BASE_PATH)
      .use(switchPlugin.plugin({wechat: true}))
      .send({
        FromUserName: user.userId,
        MsgType: 'event',
        Event: 'click',
        EventKey: 'recent'
      })
      .expect(200)
    expect(res1.body.length).to.be.equal(2)
    let birth2 = await utility.createTestBirthAsync(user.userId, {
      type: 'SOLAR',
      date: moment().format('YYYY-MM-DD')
    })
    let res2 = await api.post(BASE_PATH)
      .use(switchPlugin.plugin({wechat: true}))
      .send({
        FromUserName: user.userId,
        MsgType: 'event',
        Event: 'click',
        EventKey: 'recent'
      })
      .expect(200)
    expect(res2.body.length).to.be.equal(3)
    await utility.removeTestBirthAsync(birth1)
    await utility.removeTestBirthAsync(birth2)
  })
})
