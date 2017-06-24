'use strict'

const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('remind', {
  remindId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '提醒 Id'
  },
  settingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '设置 Id'
  },
  isRemind: {
    type: Sequelize.ENUM,
    values: ['Y', 'N'],
    defaultValue: 'N',
    allowNull: false,
    comment: '是否已经提醒',
    get: function () {
      let isRemind = this.getDataValue('isRemind')
      return isRemind === 'Y'
    },
    set: function (isRemind) {
      this.setDataValue('isRemind', isRemind ? 'Y' : 'N')
    }
  }
}, {
  freezeTableName: true
})
