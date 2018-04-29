
const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')

const BASE_PATH = '/api/births/detail'
const userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let birth

  before(function* () {
    let user = await userPlugin.before()
    birth = await utility.createTestBirthAsync(user.userId)
  })

  after(function* () {
    await utility.removeTestBirthAsync(birth)
    await userPlugin.after()
  })

  describe('get', function () {
    it('should throw not found error', function* () {
      await api.get(BASE_PATH)
        .query({birthId: -1})
        .use(userPlugin.plugin())
        .expect(404)
    })

    it('should return birth detail', function* () {
      await api.get(BASE_PATH)
        .query({birthId: birth.birthId})
        .use(userPlugin.plugin())
        .expect(200)
    })
  })
})
