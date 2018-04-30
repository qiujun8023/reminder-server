const { expect } = require('chai')

const utils = require('../lib/utils')
const random = require('../lib/random')

describe('/api/births', function () {
  let user
  let birth

  before(async () => {
    user = await utils.createTestUserAsync()
  })

  after(async () => {
    await utils.removeTestUserAsync(user)
  })

  describe('create', function () {
    it('should create birth success', async () => {
      let res = await request.post('/api/births')
        .use(utils.setUserSession(user))
        .send({
          title: random.getBirthTitle(),
          type: random.getBirthType(),
          date: random.getBirthDate(),
          color: random.getBirthColor()
        })
        .expect(201)
      birth = res.body
    })
  })

  describe('list', function () {
    it('should return birth list', async () => {
      let res = await request.get('/api/births')
        .use(utils.setUserSession(user))
        .expect(200)

      expect(res.body.length).to.equal(1)
      expect(res.body[0].title).to.equal(birth.title)
      expect(res.body[0].type).to.equal(birth.type)
      expect(res.body[0].date).to.equal(birth.date)
      expect(res.body[0].color).to.equal(birth.color)
    })
  })

  describe('detail', function () {
    it('should throw not found error', async () => {
      await request.get(`/api/births/-1`)
        .use(utils.setUserSession(user))
        .expect(404)
    })

    it('should return birth detail', async () => {
      let res = await request.get(`/api/births/${birth.birthId}`)
        .use(utils.setUserSession(user))
        .expect(200)

      expect(res.body.title).to.equal(birth.title)
      expect(res.body.type).to.equal(birth.type)
      expect(res.body.date).to.equal(birth.date)
      expect(res.body.color).to.equal(birth.color)
    })
  })

  describe('update', function () {
    it('should update birth success', async () => {
      let title = random.getBirthTitle()
      let type = random.getBirthType()
      let date = random.getBirthDate()
      let color = random.getBirthColor()
      let res = await request.put(`/api/births/${birth.birthId}`)
        .use(utils.setUserSession(user))
        .send({
          title,
          type,
          date,
          color
        })
        .expect(200)
      expect(res.body.title).to.equal(title)
      expect(res.body.type).to.equal(type)
      expect(res.body.date).to.equal(date)
      expect(res.body.color).to.equal(color)
    })
  })

  describe('remove', function () {
    it('should remove birth success', async () => {
      await request.delete(`/api/births/${birth.birthId}`)
        .use(utils.setUserSession(user))
        .expect(200)

      await request.delete(`/api/births/${birth.birthId}`)
        .use(utils.setUserSession(user))
        .expect(404)
    })
  })
})
