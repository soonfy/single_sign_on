const { Schema } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  sault: {
    type: String,
  },
  create_time: {
    type: Date,
  },
  update_time: {
    type: Date,
  },
})

module.exports = schema
