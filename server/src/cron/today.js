const birthService = require('../service/birth')
const remindService = require('../service/remind')

let addToRemindAsync = async (births) => {
  for (let birth of births) {
    for (let setting of birth.settings) {
      if (setting.advance !== birth.info.countdown) {
        continue
      }

      await remindService.createAsync({
        settingId: setting.settingId,
        birthId: birth.birthId
      })
    }
  }
}

module.exports = async () => {
  let offset = 0
  let limit = 20

  // eslint-disable-next-line
  while (true) {
    let births = await birthService.findWithSettingAsync({}, offset, limit)
    if (!births || !births.length) {
      break
    }

    await addToRemindAsync(births)
    offset += limit
  }
}
