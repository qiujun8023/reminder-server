const Sequelize = require('sequelize')

const utils = require('../lib/utils')
const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('birth', {
  birthId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    comment: '主键'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'user_id',
    comment: 'user主键'
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'title',
    comment: '姓名/标题'
  },
  type: {
    type: Sequelize.ENUM,
    values: ['SOLAR', 'LUNAR'],
    allowNull: false,
    field: 'type',
    comment: '阳历/阴历'
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'date',
    comment: '生日日期'
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'color',
    comment: '颜色'
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
  tableName: 'birth',
  timestamps: true,
  getterMethods: {
    info () {
      return utils.getBirthInfo(this.date, this.type)
    }
  },
  indexes: [
    {
      unique: false,
      fields: ['user_id']
    }
  ]
})
