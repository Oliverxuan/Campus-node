const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const service = require('../service/user.service')

class AuthController {
  //登陆颁发token
  async login(ctx, next) {
    const { openid, name } = ctx.user
    const token = jwt.sign({ openid, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    const result = await service.getUserByOpenId(openid)

    ctx.body = {
      result: result[0],
      token: token,
    }
  }

  async success(ctx, next) {
    ctx.body = '授权成功！  '
  }
}

module.exports = new AuthController()
