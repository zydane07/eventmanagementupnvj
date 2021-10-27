const { date } = require('joi');
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  id_event: String,
  poster_event: String,
  kategori: String,
  nama_event: String,
  tanggal_event: Date,
  deskripsi_event: Date,
  benefits: String,
  register_people: String,
});

module.exports = mongoose.model('Event', eventSchema);