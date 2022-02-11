//导入dotenv配置管理插件
const dotenv = require('dotenv')

//导入fs文件管理插件
const fs = require('fs')

//启动dotenv插件相关操作
dotenv.config()

// 读取私钥
const PRIVATE_KEY = fs.readFileSync('src/app/keys/private.key')

// 读取公钥
const PUBLIC_KEY = fs.readFileSync('src/app/keys/public.key')

//读取.env中的配置信息
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT,
  MYSQL_PASSWORD,
} = process.env

//key导出
module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
