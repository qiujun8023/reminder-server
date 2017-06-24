'use strict'

const expect = require('chai').expect

const {User, Birth, Setting} = require('../../service')
const utility = require('../lib/utility')
const random = require('../lib/random')

describe('service/user', function () {
  let user
  let birth
  let setting

  describe('addOrUpdateAsync', function () {
    it('should add user success', function* () {
      user = yield utility.createTestUserAsync()
      expect(user).to.include.keys(['userId', 'name', 'gender', 'mobile', 'email', 'avatar'])
    })
  })

  describe('getAsync', function () {
    it('should return false if user not found', function* () {
      let tmpUser = yield User.getAsync('invalid user')
      expect(tmpUser).to.be.false
    })

    it('should get user success', function* () {
      let tmpUser = yield User.getAsync(user.userId)
      expect(tmpUser.name).to.equal(user.name)
    })
  })

  describe('removeAsync', function () {
    it('should return false if user not found', function* () {
      let tmpUser = yield User.removeAsync(-1)
      expect(tmpUser).to.be.false
    })

    it('should add birth success', function* () {
      birth = yield utility.createTestBirthAsync(user.userId)
      expect(birth).to.include.keys(['birthId', 'title', 'type', 'date'])
    })

    it('should add setting success', function* () {
      let advance = random.getSettingAdvance()
      let time = random.getSettingTime()
      setting = yield Setting.addAsync(birth.birthId, {advance, time})
      expect(setting).to.include.keys(['settingId', 'advance', 'time'])
    })

    it('should remove user and birth and setting success', function* () {
      yield User.removeAsync(user.userId)
      let tmpUser = yield User.getAsync(user.userId)
      let tmpBirth = yield Birth.getAsync(birth.birthId)
      let tmpSetting = yield Setting.getAsync(setting.settingId)
      expect(tmpUser).to.be.false
      expect(tmpBirth).to.be.false
      expect(tmpSetting).to.be.false
    })
  })
})
