'use strict'

const expect = require('chai').expect

const {Remind} = require('../../service')
const utility = require('../lib/utility')

describe('service/remind', function () {
  let user
  let birth
  let setting
  let remind

  before(function* () {
    user = yield utility.createTestUserAsync()
    birth = yield utility.createTestBirthAsync(user.userId)
    setting = yield utility.createTestSettingAsync(birth.birthId)
  })

  after(function* () {
    yield utility.removeTestBirthAsync(birth)
    yield utility.removeTestUserAsync(user)
    yield utility.removeTestSettingAsync(setting)
  })

  describe('addAsync', function () {
    it('should return false if setting not found', function* () {
      let tmpRemind = yield Remind.addAsync(-1)
      expect(tmpRemind).to.be.false
    })

    it('should add remind success', function* () {
      remind = yield Remind.addAsync(setting.settingId)
      expect(remind).to.include.keys(['remindId', 'isRemind'])
    })
  })

  describe('findNowAsync', function () {
    it('should return now remind success', function* () {
      let reminds = yield Remind.findNowAsync()
      expect(reminds).to.be.an('array')
    })
  })

  describe('updateAsync', function () {
    it('should return false if remind not found', function* () {
      let tmpRemind = yield Remind.updateAsync(-1)
      expect(tmpRemind).to.be.false
    })

    it('should update remind success', function* () {
      let isRemind = true
      remind = yield Remind.updateAsync(remind.remindId, {isRemind})
      expect(remind.isRemind).to.equal(isRemind)
    })
  })
})
