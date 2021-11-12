const { date } = require('joi');
const mongoose = require('mongoose');

const ormawaSchema = mongoose.Schema({
  nama: String,
  password: String,
  deskripsi: String,
  photo: String,
});

module.exports = mongoose.model('Ormawa', ormawaSchema);