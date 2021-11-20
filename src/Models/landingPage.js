const mongoose = require('mongoose');

const { Schema } = mongoose;

const landingpage = new Schema({
  id: {
    type: Number,
    required: true
  },
  judul: {
    type: String,
  },
  deskripsi_lp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ladingpage', landingpage);
