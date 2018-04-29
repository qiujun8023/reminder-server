
const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')
const random = require('../../lib/random')

let BASE_PATH = '/api/settings/detail'
let userPlugin = plugins.user()

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
        .query({settingId: -1})
        .use(userPlugin.plugin())
        .expect(404)
    })

    it('should return setting detail', function* () {
      let res = await api.post('/api/settings')
        .use(userPlugin.plugin())
        .send({
          birthId: birth.birthId,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(201)

      let setting = res.body

      await api.get(BASE_PATH)
        .query({settingId: setting.settingId})
        .use(userPlugin.plugin())
        .expect(200)
    })
  })
})
