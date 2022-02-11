const Router = require('koa-router')

const userRouter = new Router({ prefix: '/campus/user' })

const {
  success,
  wei,
  getOpen,
  create,
} = require('../controller/user.controller.js')
const { getMes, backMes, verifyUser } = require('../middleware/user.middleware')

const { login } = require('../controller/auth.controller.js')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

userRouter.post('/info', verifyAuth, success)
//获取openid
userRouter.post('/openid', wei, getOpen)
//登陆接口
userRouter.post('/login', verifyLogin, login)
//注册接口
userRouter.post('/register', verifyUser, create, verifyLogin, login)
//解密接口
userRouter.post('/mes', getMes, backMes)

module.exports = userRouter
