const { expect } = require('chai')

const utils = require('../lib/utils')
const random = require('../lib/random')
const userService = require('../../src/service/user')

describe('service/user', () => {
  let user

  describe('createAsync', () => {
    it('should create user success', async () => {
      user = await utils.createTestUserAsync()
    })

    it('should throw exception if username is exist', async () => {
      try {
        await utils.createTestUserAsync({
          username: user.username
        })
      } catch (e) {
        return true
      }
      expect(true).to.equal(false)
    })
  })

  describe('getAsync', () => {
    it('should return null if user not found', async () => {
      let res = await userService.getAsync(-1)
      expect(res).to.equal(null)
    })

    it('should get user success', async () => {
      let res = await userService.getAsync(user.userId)
      expect(res.username).to.equal(user.username)
    })
  })

  describe('getByUserNameAsync', () => {
    it('should get user success', async () => {
      let res = await userService.getByUserNameAsync(user.username)
      expect(res.userId).to.equal(user.userId)
    })
  })

  describe('updateAsync', () => {
    it('should return false if user not found', async () => {
      let res = await userService.updateAsync(-1)
      expect(res).to.equal(false)
    })

    it('should update user success', async () => {
      let username = random.getUsername()
      let res = await userService.updateAsync(user.userId, { username })
      expect(res.username).to.equal(username)
      user = res
    })
  })

  describe('removeWithBirthAsync', () => {
    it('should return false if user not found', async () => {
      let res = await userService.removeWithBirthAsync(-1)
      expect(res).to.equal(false)
    })

    it('should remove user success', async () => {
      await utils.removeTestUserAsync(user)
      let res = await userService.getAsync(user.userId)
      expect(res).to.equal(null)
    })
  })
})
