const { date } = require('joi');
const mongoose = require('mongoose');

const homepageSchema = mongoose.Schema({
  Id_Event : String,
  Nama_Event: String,
  Tanggal_Event : Date,
});

module.exports = mongoose.model('Homepage', homepageSchema);