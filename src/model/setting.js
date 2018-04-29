const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('setting', {
  settingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    comment: '主键'
  },
  birthId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'birth_id',
    comment: 'birth主键'
  },
  advance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'advance',
    comment: '提前的天数'
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    field: 'time',
    comment: '提醒的时间'
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
  tableName: 'setting',
  timestamps: true,
  indexes: [
    {
      unique: false,
      fields: ['birth_id']
    }
  ]
})
