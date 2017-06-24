'use strict'

const expect = require('chai').expect

const {Setting} = require('../../service')
const utility = require('../lib/utility')
const random = require('../lib/random')

describe('service/setting', function () {
  let user
  let birth
  let setting

  before(function* () {
    user = yield utility.createTestUserAsync()
    birth = yield utility.createTestBirthAsync(user.userId)
  })

  after(function* () {
    yield utility.removeTestBirthAsync(birth)
    yield utility.removeTestUserAsync(user)
  })

  describe('addAsync', function () {
    it('should return false if birth not found', function* () {
      let tmpSetting = yield Setting.addAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should add setting success', function* () {
      setting = yield utility.createTestSettingAsync(birth.birthId)
      expect(setting).to.include.keys(['settingId', 'advance', 'time'])
    })
  })

  describe('getAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = yield Setting.getAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should get setting success', function* () {
      let tmpSetting = yield Setting.getAsync(setting.settingId)
      expect(tmpSetting.settingId).to.equal(setting.settingId)
      expect(tmpSetting.advance).to.equal(setting.advance)
      expect(tmpSetting.time).to.equal(setting.time)
    })
  })

  describe('findAsync', function () {
    it('should return setting list success', function* () {
      let settings = yield Setting.findAsync(birth.birthId)
      expect(settings.length).to.equal(1)
      expect(settings[0].settingId).to.equal(setting.settingId)
    })
  })

  describe('updateAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = yield Setting.updateAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should update setting success', function* () {
      let advance = random.getSettingAdvance()
      let time = '00:00'
      let tmpSetting = yield Setting.updateAsync(setting.settingId, {advance, time})
      expect(tmpSetting.advance).to.equal(advance)
      expect(tmpSetting.time).to.equal(time)
      setting.advance = advance
      setting.time = time
    })
  })

  describe('removeAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpSetting = yield Setting.removeAsync(-1)
      expect(tmpSetting).to.be.false
    })

    it('should remove setting success', function* () {
      yield Setting.removeAsync(setting.settingId)
      let tmpSetting = yield Setting.getAsync(setting.settingId)
      expect(tmpSetting).to.be.false
    })
  })
})
