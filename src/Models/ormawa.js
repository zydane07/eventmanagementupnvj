const { date } = require('joi');
const mongoose = require('mongoose');

const ormawaSchema = mongoose.Schema({
  id_ormawa: {
    type: Number,
    required: true,
    unique: true,
  },
  email_ormawa: {
    type: String,
    required: true,
    unique: true,
  },
  nama_ormawa: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model('Ormawa', ormawaSchema);