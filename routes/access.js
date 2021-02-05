const router = require('koa-router')()

router.prefix('/access')

const { SsoUsers } = require('../models')

const { decryptPassword, encryptPassword, verifyPassword } = require('../helpers/crypto')

router.get('/signup', async (ctx) => {
  await ctx.render('sign_up', {
    title: 'sso-注册',
  })
})

router.post('/signup/', async (ctx) => {
  const { body } = ctx.request
  console.log(body)
  const { username, password } = body
  const user = await SsoUsers.findOne({ username })
  if (user) {
    return ctx.throw('001400')
  }
  const passwordText = decryptPassword(password)
  const { sault, ciphertext } = encryptPassword(passwordText)
  const doc = {
    username,
    password: ciphertext,
    sault,
    create_time: new Date(),
    update_time: new Date(),
  }
  const record = await SsoUsers.create(doc)
  ctx.body = {
    record,
  }
})

router.get('/login', async (ctx) => {
  await ctx.render('log_in', {
    title: 'sso-登录',
  })
})

router.post('/login/', async (ctx) => {
  const { body } = ctx.request
  console.log(body)
  const { username, password } = body
  const record = await SsoUsers.findOne({ username })
  if (!record) {
    return ctx.throw('001401')
  }
  const passwordText = decryptPassword(password)
  const isPassword = verifyPassword(passwordText, record.password, record.sault)
  if (!isPassword) {
    return ctx.throw('001402')
  }
  ctx.body = {
    record,
  }
})

module.exports = router
