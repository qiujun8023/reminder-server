
const userPlugin = require('../../lib/plugin').user()

const BASE_PATH = '/api/births'

describe('middleware/security/wechat', function () {
  before(function* () {
    await userPlugin.before()
  })

  after(function* () {
    await userPlugin.after()
  })

  it('should throw unauthorized error', function* () {
    await api.get(BASE_PATH).expect(401)
  })

  it('should return birth list', function* () {
    await api.get(BASE_PATH)
      .use(userPlugin.plugin())
      .expect(200)
  })
})
