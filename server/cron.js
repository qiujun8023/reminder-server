'use strict'

require('moment').locale('zh-cn')
require('./cron/today').start()
require('./cron/now').start()
