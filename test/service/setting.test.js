
const expect = require('chai').expect

const {Setting} = require('../../service')
const utility = require('../lib/utility')
const random = require('../lib/random')

describe('service/setting', function () {
  let user
  let birth
  let setting

  before(function* () {
    user = await utility.createTestUserAsync()
    birth = await utility.createTestBirthAsync(user.userId)
  })

  after(function* () {
    await utility.removeTestBirthAsync(birth)
    await utility.removeTestUserAsync(user)
  })

  describe('addAsync', function () {
    it('should return false if birth not found', function* () {
      let tmpSetting = await Setting.addAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should add setting success', function* () {
      setting = await utility.createTestSettingAsync(birth.birthId)
      expect(setting).to.include.keys(['settingId', 'advance', 'time'])
    })
  })

  describe('getAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = await Setting.getAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should get setting success', function* () {
      let tmpSetting = await Setting.getAsync(setting.settingId)
      expect(tmpSetting.settingId).to.equal(setting.settingId)
      expect(tmpSetting.advance).to.equal(setting.advance)
      expect(tmpSetting.time).to.equal(setting.time)
    })
  })

  describe('findAsync', function () {
    it('should return setting list success', function* () {
      let settings = await Setting.findAsync(birth.birthId)
      expect(settings.length).to.equal(1)
      expect(settings[0].settingId).to.equal(setting.settingId)
    })
  })

  describe('updateAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = await Setting.updateAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should update setting success', function* () {
      let advance = random.getSettingAdvance()
      let time = '00:00'
      let tmpSetting = await Setting.updateAsync(setting.settingId, {advance, time})
      expect(tmpSetting.advance).to.equal(advance)
      expect(tmpSetting.time).to.equal(time)
      setting.advance = advance
      setting.time = time
    })
  })

  describe('removeAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = await Setting.removeAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should remove setting success', function* () {
      await Setting.removeAsync(setting.settingId)
      let tmpSetting = await Setting.getAsync(setting.settingId)
      expect(tmpSetting).to.be.false
    })
  })
})
