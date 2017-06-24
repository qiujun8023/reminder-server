'use strict'

const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')

const BASE_PATH = '/api/births/detail'
const userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let birth

  before(function* () {
    let user = yield userPlugin.before()
    birth = yield utility.createTestBirthAsync(user.userId)
  })

  after(function* () {
    yield utility.removeTestBirthAsync(birth)
    yield userPlugin.after()
  })

  describe('get', function () {
    it('should throw not found error', function* () {
      yield api.get(BASE_PATH)
        .query({birthId: -1})
        .use(userPlugin.plugin())
        .expect(404)
    })

    it('should return birth detail', function* () {
      yield api.get(BASE_PATH)
        .query({birthId: birth.birthId})
        .use(userPlugin.plugin())
        .expect(200)
    })
  })
})
