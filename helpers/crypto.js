const CryptoJS = require('crypto-js')
const crypto = require('crypto')

/**
 * 解密前端传递过来的登录密码
 * @param {*} ciphertext 登录密码
 */
exports.decryptPassword = (ciphertext) => {
  const KEY = 'sso password key'
  return CryptoJS.AES.decrypt(ciphertext, KEY).toString(CryptoJS.enc.Utf8)
}

/**
 * 加密需要传递给前端的文本内容
 * @param {*} plaintext 文本内容
 */
exports.encryptText = (plaintext) => {
  const key = 'sso password key'
  const algo = 'AES'
  return {
    algo,
    key,
    data: CryptoJS[algo].encrypt(plaintext, key).toString(),
  }
}

/**
 * 随机生成指定长度的字符串
 * @param {*} length 长度
 */
exports.getRandomString = (length) => crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)

/**
 * 加盐加密用户密码
 * @param {*} password 用户密码
 */
exports.encryptPassword = (password) => {
  const sault = this.getRandomString(16)
  const hmac = crypto.createHmac('sha256', sault)
  hmac.update(password)
  const ciphertext = hmac.digest('hex')
  return {
    ciphertext,
    sault,
  }
}

/**
 * 验证用户密码是否匹配
 * @param {*} plaintext 密码明文
 * @param {*} password 密码密文
 * @param {*} sault 加盐
 */
exports.verifyPassword = (plaintext, password, sault) => {
  const hmac = crypto.createHmac('sha256', sault)
  hmac.update(plaintext)
  const ciphertext = hmac.digest('hex')
  return ciphertext === password
}
