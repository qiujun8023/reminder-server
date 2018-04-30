const { expect } = require('chai')

const utils = require('../lib/utils')
const random = require('../lib/random')
const birthService = require('../../src/service/birth')

describe('service/birth', function () {
  let user
  let birth

  before(async () => {
    user = await utils.createTestUserAsync()
  })

  after(async () => {
    await utils.removeTestUserAsync(user)
  })

  describe('createAsync', function () {
    it('should create birth success', async () => {
      birth = await utils.createTestBirthAsync(user.userId)
      birth = birth.get({ plain: true })
      expect(birth).to.include.keys(['birthId', 'title', 'type', 'date'])
    })
  })

  describe('getAsync', function () {
    it('should return null if birth not found', async () => {
      let res = await birthService.getAsync(-1)
      expect(res).to.equal(null)
    })

    it('should get birth success', async () => {
      let res = await birthService.getAsync(birth.birthId)
      expect(res.title).to.equal(birth.title)
      expect(res.type).to.equal(birth.type)
      expect(res.date).to.equal(birth.date)
    })
  })

  describe('findByUserIdAsync', function () {
    it('should return birth list success', async () => {
      let births = await birthService.findByUserIdAsync(user.userId)
      expect(births.length).to.equal(1)
      expect(births[0].birthId).to.equal(birth.birthId)
    })
  })

  describe('updateAsync', function () {
    it('should return false if birth not found', async () => {
      let res = await birthService.updateAsync(-1)
      expect(res).to.equal(false)
    })

    it('should update birth success', async () => {
      let title = random.getBirthTitle()
      let res = await birthService.updateAsync(birth.birthId, { title })
      expect(res.title).to.equal(title)
      birth.title = title
    })
  })

  describe('findWithSettingAsync', function () {
    it('should return list success', async () => {
      let births = await birthService.findWithSettingAsync({
        userId: user.userId
      })
      expect(births.length).to.equal(1)
      expect(births[0]).to.include.keys('settings')
    })
  })

  describe('removeWithSettingAsync', function () {
    it('should return false if birth not found', async () => {
      let res = await birthService.removeWithSettingAsync(-1)
      expect(res).to.equal(false)
    })

    it('should remove birth and setting success', async () => {
      await birthService.removeWithSettingAsync(birth.birthId)
      let res = await birthService.removeWithSettingAsync(birth.birthId)
      expect(res).to.equal(false)
    })
  })
})
