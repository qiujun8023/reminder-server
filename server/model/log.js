'use strict'

const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('log', {
  logId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '日志 Id'
  },
  userId: {
    type: Sequelize.STRING(30),
    allowNull: false,
    comment: '用户 Id'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '内容'
  }
}, {
  updatedAt: false,
  freezeTableName: true
})
