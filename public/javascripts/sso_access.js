/**
 * 按钮显示加载中
 * @param {*} node 按钮节点
 */
const changeLoading = (node) => {
  const elem = $(node)
  elem.children('#loading_spinner').eq(0).show()
  elem.attr('disabled', true)
}

/**
 * 按钮初始化，不显示加载中
 * @param {*} node 按钮节点
 */
const initStatus = (node) => {
  const elem = $(node)
  elem.children('#loading_spinner').eq(0).hide()
  elem.attr('disabled', false)
}

/**
 * 验证用户名
 * @param {*} username 用户名
 */
const verifyUsername = (username) => {
  const reg = /[a-zA-Z][a-zA-Z0-9_]{5,19}/
  return reg.test(username)
}

/**
 * 验证密码
 * @param {*} password 密码
 */
const verifyPassword = (password) => {
  const reg = /\S{6,20}/
  return reg.test(password)
}

/**
 * 加密密码
 * @param {*} password 密码
 */
const encryptPassword = (password) => {
  const KEY = 'sso password key'
  return CryptoJS.AES.encrypt(password, KEY).toString()
}

/**
 * ENTER 点击按钮
 */
const keyup = () => {
  document.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key.toUpperCase() === 'ENTER') {
      const loginb = document.getElementById('log-in-button')
      const signupb = document.getElementById('sign-up-button')
      if (loginb) {
        loginb.click()
      } else if (signupb) {
        signupb.click()
      }
    }
  })
}

/**
 * 禁止输入空格
 */
const keydown = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  })
}

/**
 * 提示信息
 * @param {*} options 提示信息的参数
 */
const alertMessage = (options) => {
  const { status, message } = options
  const alertItem = $('.alert')
  const className = `alert-${status}`
  alertItem.addClass(className).text(message).show()
  setTimeout(() => alertItem.hide().removeClass(className), 3000)
}

/**
 * 登录事件
 */
const login = () => {
  const loginb = document.getElementById('log-in-button')
  if (!loginb) {
    return
  }
  initStatus(loginb)
  loginb.addEventListener('click', () => {
    changeLoading(loginb)
    // const formData = $('#sso-form').serialize()
    // console.log(formData)
    const username = $('#sso-username').val()
    if (!verifyUsername(username)) {
      alertMessage({
        status: 'danger',
        message: '不规范的用户名',
      })
      initStatus(loginb)
      return
    }
    let password = $('#sso-password').val()
    if (!verifyPassword(password)) {
      alertMessage({
        status: 'danger',
        message: '不规范的密码',
      })
      initStatus(loginb)
      return
    }
    password = encryptPassword(password)
    const formData = {
      username,
      password,
    }
    const xhr = $.post('/access/login/', formData, (resp) => {
      console.log(resp)
    })
    xhr.fail((error) => {
      console.error(error)
    })
    xhr.always(() => {
      setTimeout(() => initStatus(loginb), 2000)
    })
  }, false)
}

/**
 * 注册事件
 */
const signup = () => {
  const signupb = document.getElementById('sign-up-button')
  if (!signupb) {
    return
  }
  initStatus(signupb)
  signupb.addEventListener('click', () => {
    changeLoading(signupb)
    // const formData = $('#sso-form').serialize()
    // console.log(formData)
    const username = $('#sso-username').val()
    if (!verifyUsername(username)) {
      alertMessage({
        status: 'danger',
        message: '不规范的用户名',
      })
      initStatus(signupb)
      return
    }
    let password = $('#sso-password').val()
    if (!verifyPassword(password)) {
      alertMessage({
        status: 'danger',
        message: '不规范的密码',
      })
      initStatus(signupb)
      return
    }
    password = encryptPassword(password)
    const formData = {
      username,
      password,
    }
    const xhr = $.post('/access/signup/', formData, (resp) => {
      console.log(resp)
    })
    xhr.fail((error) => {
      console.error(error)
    })
    xhr.always(() => {
      setTimeout(() => initStatus(signupb), 2000)
    })
  }, false)
}

window.addEventListener('load', () => {
  login()
  signup()
  keyup()
  keydown()
}, false)
