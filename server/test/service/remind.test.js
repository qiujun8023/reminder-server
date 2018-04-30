const { expect } = require('chai')

const utils = require('../lib/utils')
const remindService = require('../../src/service/remind')

describe('service/remind', () => {
  let user
  let birth
  let setting
  let remind

  before(async () => {
    user = await utils.createTestUserAsync()
    birth = await utils.createTestBirthAsync(user.userId)
    setting = await utils.createTestSettingAsync(user.userId, birth.birthId)
  })

  after(async () => {
    await utils.removeTestBirthAsync(birth)
    await utils.removeTestUserAsync(user)
    await utils.removeTestSettingAsync(setting)
  })

  describe('createAsync', () => {
    it('should create remind success', async () => {
      remind = await remindService.createAsync({
        settingId: setting.settingId,
        birthId: setting.birthId
      })
      remind = remind.get({ plain: true })
      expect(remind).to.include.keys(['remindId', 'isRemind'])
    })
  })

  describe('findAsync', () => {
    it('should return remind list success', async () => {
      let reminds = await remindService.findAsync({
        birthId: birth.birthId
      })
      expect(reminds.length).to.equal(1)
      expect(reminds[0].birthId).to.equal(birth.birthId)
    })
  })

  describe('setReminded', () => {
    it('should set reminded success', async () => {
      await remindService.setReminded([remind.remindId])
      let res = await remindService.findAsync({
        birthId: birth.birthId
      })
      expect(res[0].isRemind).to.equal(true)
    })
  })

  describe('updateAsync', () => {
    it('should return false if remind not found', async () => {
      let res = await remindService.updateAsync(-1)
      expect(res).to.equal(false)
    })

    it('should update remind success', async () => {
      remind = await remindService.updateAsync(remind.remindId, {
        isRemind: false
      })
      expect(remind.isRemind).to.equal(false)
    })
  })

  describe('findNeedRemindAsync', () => {
    it('should return now remind success', async () => {
      let reminds = await remindService.findNeedRemindAsync()
      expect(reminds).to.be.an('array')
    })
  })
})
