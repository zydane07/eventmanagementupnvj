const { date } = require('joi');
const mongoose = require('mongoose');

const homepageSchema = mongoose.Schema({
  id_event : String,
  nama_event: String,
  tanggal_event : Date,
  poster_event : String,
  kategori : String,
});

module.exports = mongoose.model('Homepage', homepageSchema);