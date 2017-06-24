'use strict'

const expect = require('chai').expect

const plugins = require('../lib/plugin')
const utility = require('../lib/utility')
const random = require('../lib/random')

let BASE_PATH = '/api/settings'
let userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let birth
  let setting

  before(function* () {
    let user = yield userPlugin.before()
    birth = yield utility.createTestBirthAsync(user.userId)
  })

  after(function* () {
    yield utility.removeTestBirthAsync(birth)
    yield userPlugin.after()
  })

  describe('post', function () {
    it('should return error with invalid advance', function* () {
      let res = yield api.post(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          birthId: birth.birthId,
          advance: -1,
          time: random.getSettingTime()
        })
        .expect(400)

      expect(res.body.type).to.equal('InvalidParameter')
    })

    it('should throw not found with invalid birth id', function* () {
      yield api.post(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          birthId: -1,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(404)
    })

    it('should add setting success', function* () {
      let res = yield api.post(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          birthId: birth.birthId,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(201)
      setting = res.body
    })
  })

  describe('get', function () {
    it('should throw not found error', function* () {
      yield api.get(BASE_PATH)
        .use(userPlugin.plugin())
        .query({
          birthId: -1
        })
        .expect(404)
    })

    it('should return setting list', function* () {
      let birthId = birth.birthId
      let res = yield api.get(BASE_PATH)
        .use(userPlugin.plugin())
        .query({birthId})
        .expect(200)
      expect(res.body.length).to.equal(1)
    })
  })

  describe('put', function () {
    it('should throw not found error', function* () {
      yield api.put(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          settingId: -1,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(404)
    })

    it('should update setting success', function* () {
      let advance = random.getSettingAdvance()
      let time = random.getSettingTime()
      let res = yield api.put(BASE_PATH)
        .use(userPlugin.plugin())
        .send({settingId: setting.settingId, advance, time})
        .expect(200)
      expect(res.body.advance).to.equal(advance)
      expect(res.body.time).to.equal(time)
    })
  })

  describe('delete', function () {
    it('should return not found with invalid setting id', function* () {
      yield api.delete(BASE_PATH)
        .use(userPlugin.plugin())
        .query({
          settingId: -1
        })
        .expect(404)
    })

    it('should delete setting success', function* () {
      let birthId = birth.birthId
      let settingId = setting.settingId
      yield api.delete(BASE_PATH)
        .use(userPlugin.plugin())
        .query({settingId})
        .expect(200)
      let res = yield api.get(BASE_PATH)
        .use(userPlugin.plugin())
        .query({birthId})
        .expect(200)
      expect(res.body.length).to.equal(0)
    })
  })
})
