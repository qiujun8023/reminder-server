const utils = require('../../lib/utils')

describe('middleware/security/oauth', () => {
  let user

  before(async () => {
    user = await utils.createTestUserAsync()
  })

  after(async () => {
    await utils.removeTestUserAsync(user)
  })

  it('should throw unauthorized error', async () => {
    await request.get('/api/births').expect(401)
  })

  it('should return birth list success', async () => {
    await request.get('/api/births')
      .use(utils.setUserSession(user))
      .expect(200)
  })
})
