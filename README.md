#### 项目状态

##### Master

[![Build Status](https://travis-ci.org/qious/birthday.svg?branch=master)](https://travis-ci.org/qious/birthday)
[![Coverage Status](https://coveralls.io/repos/github/qious/birthday/badge.svg?branch=master)](https://coveralls.io/github/qious/birthday?branch=master)


##### Develop

[![Build Status](https://travis-ci.org/qious/birthday.svg?branch=develop)](https://travis-ci.org/qious/birthday)
[![Coverage Status](https://coveralls.io/repos/github/qious/birthday/badge.svg?branch=develop)](https://coveralls.io/github/qious/birthday?branch=develop)


### **线上运行**

```bash
cd /path/to/birthday/server/
npm install
cp config/default.js config/local.js
cp pm2.sample.json pm2.json
npm run start
```

### **协作开发**

```bash
# 后端开发
cd /path/to/birthday/server
npm install
npm run dev

# 前端开发
cd /path/to/birthday/client
npm install
npm run dev
```

#### **单元测试**

```bash
cd /path/to/birthday/server
npm run test                # 运行所有测试
npm run test -- -g network  # 只测试 network
npm run cover               # 测试覆盖率
```

### **效果展示**


#### 生日列表

![生日列表](screenshot/1.png)

#### 生日详情

![生日详情](screenshot/2.png)

#### 微信生日列表

![微信生日列表](screenshot/3.png)

#### 生日提醒

![生日提醒](screenshot/4.png)
