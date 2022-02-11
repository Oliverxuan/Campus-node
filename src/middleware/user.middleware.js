var WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const errorType = require('../constants/error-types')
const service = require('../service/user.service')

const getMes = async (ctx, next) => {
  const { appId, encryptedData, iv } = ctx.request.body
  ctx.session = global.session
  ctx.appId = appId
  ctx.encryptedData = encryptedData
  ctx.iv = iv
  await next()
}

const backMes = async (ctx, next) => {
  console.log(ctx.appId + global.session)
  const pc = new WXBizDataCrypt(ctx.appId, global.session)

  const data = pc.decryptData(ctx.encryptedData, ctx.iv)

  console.log('解密后 data: ', data)
  ctx.body = {
    code: 222,
  }
}

const verifyUser = async (ctx, next) => {
  //获取openid
  const { openid, name } = ctx.request.body

  //判断不能为空
  if (!openid || !name) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  //判断本次注册的opneid是否被注册
  const result = await service.getUserByOpenId(openid)

  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  getMes,
  backMes,
  verifyUser,
}
