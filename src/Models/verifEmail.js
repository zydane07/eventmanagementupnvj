const mongoose = require('mongoose')

const verifSchema = mongoose.Schema({
  email: String,
  emailToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('EmailVerification', verifSchema);