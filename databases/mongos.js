const mongoose = require('mongoose')
const signale = require('signale')

const { mongodb } = require('../config')

const conn = mongoose.createConnection(mongodb.url, mongodb.options)

const logger = signale.scope('mongodb')

conn.on('connected', () => {
  logger.success(`connected ${mongodb.url}`)
  const { collections } = conn
  // eslint-disable-next-line
  for (const name in collections) {
    logger.success(`connected table ${name}`)
  }
})

conn.on('error', (error) => {
  logger.error(`error connected ${mongodb.url}`)
  logger.error(error)
})

conn.on('disconnected', () => {
  logger.error(`disconnected ${mongodb.url}`)
})

exports.conn = conn
