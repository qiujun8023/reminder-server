const User = require('./user')
const Birth = require('./birth')
const Setting = require('./setting')
const Remind = require('./remind')
const sequelize = require('../lib/sequelize')

// 用户与生日的关系
User.hasMany(Birth, {
  foreignKey: 'userId',
  constraints: false
})
Birth.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false
})

// 生日与设置的关系
Birth.hasMany(Setting, {
  foreignKey: 'birthId',
  constraints: false
})
Setting.belongsTo(Birth, {
  foreignKey: 'birthId',
  constraints: false
})

// 生日与提醒的关系
Birth.hasMany(Remind, {
  foreignKey: 'settingId',
  constraints: false
})
Remind.belongsTo(Birth, {
  foreignKey: 'settingId',
  constraints: false
})

// 设置与提醒的关系
Setting.hasMany(Remind, {
  foreignKey: 'settingId',
  constraints: false
})
Remind.belongsTo(Setting, {
  foreignKey: 'settingId',
  constraints: false
})

// 同步数据到数据库
sequelize.sync()

module.exports = {
  User,
  Birth,
  Setting,
  Remind
}
