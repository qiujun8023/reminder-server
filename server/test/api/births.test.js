'use strict'

const expect = require('chai').expect

const plugins = require('../lib/plugin')
const random = require('../lib/random')

let BASE_PATH = '/api/births'
let userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let birth

  before(function* () {
    yield userPlugin.before()
  })

  after(function* () {
    yield userPlugin.after()
  })

  describe('get', function () {
    it('should return birth list', function* () {
      let res = yield api.get(BASE_PATH)
        .use(userPlugin.plugin())
        .expect(200)
      expect(res.body.length).to.equal(0)
    })
  })

  describe('post', function () {
    it('should return error with invalid type', function* () {
      let res = yield api.post(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          title: random.getBirthTitle(),
          type: 'invalid type',
          date: random.getBirthDate()
        })
        .expect(400)

      expect(res.body.type).to.equal('InvalidParameter')
    })

    it('should add birth success', function* () {
      let title = random.getBirthTitle()
      let type = random.getBirthType()
      let date = random.getBirthDate()
      yield api.post(BASE_PATH)
        .use(userPlugin.plugin())
        .send({title, type, date})
        .expect(201)

      let res = yield api.get(BASE_PATH)
        .use(userPlugin.plugin())
        .expect(200)

      birth = res.body[0]
      expect(birth.title).to.equal(title)
      expect(birth.type).to.equal(type)
      expect(birth.date).to.equal(date)
    })
  })

  describe('put', function () {
    it('should return error if birth not found', function* () {
      yield api.put(BASE_PATH)
        .use(userPlugin.plugin())
        .send({
          birthId: -1,
          title: random.getBirthTitle(),
          type: random.getBirthType(),
          date: random.getBirthDate()
        })
        .expect(404)
    })

    it('should update birth success', function* () {
      let birthId = birth.birthId
      let title = random.getBirthTitle()
      let type = random.getBirthType()
      let date = random.getBirthDate()
      let res = yield api.put(BASE_PATH)
        .use(userPlugin.plugin())
        .send({birthId, title, type, date})
        .expect(200)
      expect(res.body.title).to.equal(title)
      expect(res.body.type).to.equal(type)
      expect(res.body.date).to.equal(date)
    })
  })

  describe('delete', function () {
    it('should delete birth success', function* () {
      let birthId = birth.birthId
      yield api.delete(BASE_PATH)
        .use(userPlugin.plugin())
        .query({birthId})
        .expect(200)
      yield api.delete(BASE_PATH)
        .use(userPlugin.plugin())
        .query({birthId})
        .expect(404)
    })
  })
})
