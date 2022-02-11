const axios = require('axios')
const service = require('../service/user.service')

class UserController {
  async success(ctx, next) {
    const { openid } = ctx.user
    //创建用户信息
    const result = await service.getUserByOpenId(openid)
    ctx.body = result
  }
  // 微信登陆获取基本信息
  async wei(ctx, next) {
    ctx.wx = ctx.request.body
    await next()
  }

  //微信登陆获取openid session_key
  async getOpen(ctx, next) {
    const grant_type = 'authorization_code'
    const { code, appid, secret } = ctx.wx
    let url =
      'https://api.weixin.qq.com/sns/jscode2session?grant_type=' +
      grant_type +
      '&appid=' +
      appid +
      '&secret=' +
      secret +
      '&js_code=' +
      code

    const result = await axios
      .get(url)
      .then((res) => {
        if (res) {
          return res
        }
      })
      .catch((error) => {
        console.log(error)
        ctx.body = {
          code: 500,
        }
      })

    console.log(result.data)

    ctx.body = result.data
  }

  async create(ctx, next) {
    //获取用户请求的参数
    const user = ctx.request.body

    //创建用户信息
    const result = await service.create(user)

    console.log(user.name + '创建成功!')

    //返回数据
    await next()
  }
}
module.exports = new UserController()
