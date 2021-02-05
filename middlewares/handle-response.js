const errorMap = require('../config/error.json')

/**
 * 处理响应结果
 * @param {*} options
 */
module.exports = (options) => async (ctx, next) => {
  try {
    await next()
    const { response } = ctx
    const { status } = response
    if (status === 404) {
      ctx.body = {
        code: '000404',
        message: 'Not Found',
      }
    }
  } catch (error) {
    console.error(error)
    const { message } = error
    ctx.body = {
      code: message,
      message: errorMap[message],
    }
  }
}
