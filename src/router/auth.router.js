const Router = require('koa-router')

const authRouter = new Router({ prefix: '/campus/auth' })

const { login, success } = require('../controller/auth.controller.js')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

// authRouter.post('/login', verifyLogin, login)

authRouter.get('/test', verifyAuth, success)

module.exports = authRouter
