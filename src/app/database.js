//数据库插件导入
const mysql = require('mysql2')
//配置文件信息导入
const config = require('./config')

//建立数据库连接池
const connections = mysql.createPool({
  //配置数据库主机信息
  host: config.MYSQL_HOST,
  //端口号
  port: config.MYSQL_PORT,
  //将要连接的数据库名
  database: config.MYSQL_DATABASE,
  //root用户名
  user: config.MYSQL_ROOT,
  //root密码
  password: config.MYSQL_PASSWORD,
})

//取得数据库连接并运行判断，常常用于程序最开始。
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('数据库连接失败!')
    } else {
      console.log('数据库连接成功！')
    }
  })
})

//将数据库的连接形式以promise的方式导出。
module.exports = connections.promise()
