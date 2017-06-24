require('moder')(__dirname, {
  naming: 'pascal',
  lazy: false,
  exports
})

exports.User.sync()
exports.Birth.sync()
exports.Setting.sync()
exports.Remind.sync()
exports.Log.sync()

// 用户与生日的关系
exports.User.hasMany(exports.Birth, {
  foreignKey: 'userId',
  constraints: false
})
exports.Birth.belongsTo(exports.User, {
  foreignKey: 'userId',
  constraints: false
})

// 生日与设置的关系
exports.Birth.hasMany(exports.Setting, {
  foreignKey: 'birthId',
  constraints: false
})
exports.Setting.belongsTo(exports.Birth, {
  foreignKey: 'birthId',
  constraints: false
})

// 设置与提醒的关系
exports.Setting.hasMany(exports.Remind, {
  foreignKey: 'settingId',
  constraints: false
})
exports.Remind.belongsTo(exports.Setting, {
  foreignKey: 'settingId',
  constraints: false
})

// 用户与日志的关系
exports.User.hasMany(exports.Log, {
  foreignKey: 'userId',
  constraints: false
})
exports.Log.belongsTo(exports.User, {
  foreignKey: 'userId',
  constraints: false
})
