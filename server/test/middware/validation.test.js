const utils = require('../lib/utils')

describe('src/middware/validation', () => {
  let user

  before(async () => {
    user = await utils.createTestUserAsync()
  })

  after(async () => {
    await utils.removeTestUserAsync(user)
  })

  it('should return 400 if params is invaild', async () => {
    await request.post('/api/births')
      .use(utils.setUserSession(user))
      .send({
        date: 123
      })
      .expect(400)
  })
})
