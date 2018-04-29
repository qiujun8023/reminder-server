
const expect = require('chai').expect

const {Log} = require('../../service')
const utility = require('../lib/utility')

describe('service/log', function () {
  let user

  before(function* () {
    user = await utility.createTestUserAsync()
  })

  after(function* () {
    await utility.removeTestUserAsync(user)
  })

  describe('addLogAsync', function () {
    it('should return false if user not found', function* () {
      let tmpLog = await Log.addAsync(-1)
      expect(tmpLog).to.be.false
    })

    it('should add logs success', function* () {
      let content = 'test content'
      let log = await Log.addAsync(user.userId, {content})
      expect(log.content).to.equal(content)
    })
  })
})
