const { expect } = require('chai')

const utils = require('../lib/utils')
const random = require('../lib/random')
const settingService = require('../../src/service/setting')

describe('service/setting', () => {
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

  describe('createAsync', () => {
    it('should create setting success', async () => {
      setting = await utils.createTestSettingAsync(user.userId, birth.birthId)
      setting = setting.get({ plain: true })
      expect(setting).to.include.keys(['settingId', 'advance', 'time'])
    })
  })

  describe('getAsync', () => {
    it('should return null if setting not found', async () => {
      let res = await settingService.getAsync(-1)
      expect(res).to.equal(null)
    })

    it('should get setting success', async () => {
      let res = await settingService.getAsync(setting.settingId)
      expect(res.settingId).to.equal(setting.settingId)
      expect(res.advance).to.equal(setting.advance)
      expect(res.time).to.equal(setting.time)
    })
  })

  describe('findByBirthIdAsync', () => {
    it('should return setting list success', async () => {
      let settings = await settingService.findByBirthIdAsync(birth.birthId)
      expect(settings.length).to.equal(1)
      expect(settings[0].settingId).to.equal(setting.settingId)
    })
  })

  describe('updateAsync', () => {
    it('should return false if setting not found', async () => {
      let res = await settingService.updateAsync(-1)
      expect(res).to.equal(false)
    })

    it('should update setting success', async () => {
      let advance = random.getSettingAdvance()
      let time = random.getSettingTime()
      let res = await settingService.updateAsync(setting.settingId, {
        advance, time
      })
      expect(res.advance).to.equal(advance)
      expect(res.time).to.equal(time)
    })
  })

  describe('removeWithRemindAsync', () => {
    it('should return false if setting not found', async () => {
      let res = await settingService.removeWithRemindAsync(-1)
      expect(res).to.equal(false)
    })

    it('should remove setting success', async () => {
      await settingService.removeWithRemindAsync(setting.settingId)
      let res = await settingService.removeWithRemindAsync(setting.settingId)
      expect(res).to.equal(false)
    })
  })
})
