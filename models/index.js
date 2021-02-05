const fs = require('fs')
const { join, extname, basename } = require('path')
const { camelCase, toUpper, upperFirst } = require('lodash')

const { conn } = require('../databases/mongos')

let files = fs.readdirSync(__dirname)
files = files.filter((item) => {
  const ext = extname(item)
  if (ext !== '.js') {
    return false
  }
  const name = basename(item, ext)
  if (name === 'index') {
    return false
  }
  return true
})

const modules = files.reduce((inject, item) => {
  const schema = require(join(__dirname, item)) // eslint-disable-line
  const ext = extname(item)
  const name = basename(item, ext)
  const MODEL = toUpper(name)
  const model = upperFirst(camelCase(name))
  inject[model] = conn.model(MODEL, schema, name) // eslint-disable-line
  return inject
}, {})

module.exports = modules
