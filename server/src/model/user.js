const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('user', {
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    comment: '主键'
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'username',
    comment: '用户唯一标识'
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'nickname',
    comment: '昵称'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at',
    comment: '创建时间'
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'updated_at',
    comment: '更新时间'
  }
}, {
  tableName: 'user',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
})
