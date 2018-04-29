const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('remind', {
  remindId: {
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
  settingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'setting_id',
    comment: 'setting主键'
  },
  isRemind: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: 'is_remind',
    comment: '是否已经提醒'
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
  tableName: 'remind',
  timestamps: true,
  indexes: [
    {
      unique: false,
      fields: ['setting_id']
    },
    {
      unique: false,
      fields: ['birth_id']
    }
  ]
})
