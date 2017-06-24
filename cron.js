'use strict'

process.env.TZ = 'Asia/Shanghai'

require('moment').locale('zh-cn')
require('./cron/today').start()
require('./cron/now').start()
