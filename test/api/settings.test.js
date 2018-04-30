const { expect } = require('chai')

const utils = require('../lib/utils')
const random = require('../lib/random')

describe('/api/settings', function () {
  let user
  let birth
  let setting

  before(async () => {
    user = await utils.createTestUserAsync()
    birth = await utils.createTestBirthAsync(user.userId)
  })

  after(async () => {
    await utils.removeTestBirthAsync(birth)
    await utils.removeTestUserAsync(user)
  })

  describe('create', function () {
    it('should throw not found with invalid birth id', async () => {
      await request.post('/api/settings')
        .use(utils.setUserSession(user))
        .send({
          birthId: -1,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(404)
    })

    it('should create setting success', async () => {
      let res = await request.post('/api/settings')
        .use(utils.setUserSession(user))
        .send({
          birthId: birth.birthId,
          advance: random.getSettingAdvance(),
          time: random.getSettingTime()
        })
        .expect(201)
      setting = res.body
    })
  })

  describe('list', function () {
    it('should throw not found error', async () => {
      await request.get('/api/settings')
        .use(utils.setUserSession(user))
        .query({
          birthId: -1
        })
        .expect(404)
    })

    it('should return setting list', async () => {
      let res = await request.get('/api/settings')
        .use(utils.setUserSession(user))
        .query({
          birthId: birth.birthId
        })
        .expect(200)
      expect(res.body.length).to.equal(1)
    })
  })

  describe('detail', function () {
    it('should throw not found error', async () => {
      await request.get(`/api/settings/-1`)
        .use(utils.setUserSession(user))
        .expect(404)
    })

    it('should return setting detail', async () => {
      await request.get(`/api/settings/${setting.settingId}`)
        .use(utils.setUserSession(user))
        .expect(200)
    })
  })

  describe('put', function () {
    it('should update setting success', async () => {
      let advance = random.getSettingAdvance()
      let time = random.getSettingTime()
      let res = await request.put(`/api/settings/${setting.settingId}`)
        .use(utils.setUserSession(user))
        .send({ advance, time })
        .expect(200)
      expect(res.body.advance).to.equal(advance)
      expect(res.body.time).to.equal(time)
    })
  })

  describe('remove', function () {
    it('should remove setting success', async () => {
      await request.delete(`/api/settings/${setting.settingId}`)
        .use(utils.setUserSession(user))
        .expect(200)

      await request.get(`/api/settings/${setting.settingId}`)
        .use(utils.setUserSession(user))
        .expect(404)
    })
  })
})
