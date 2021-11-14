const { date } = require('joi');
const mongoose = require('mongoose');

const registered = mongoose.Schema({
  email: String,
  nama_lengkap: String
})

const eventSchema = mongoose.Schema({
  id_event: String,
  poster_event: String,
  kategori: String,
  nama_event: String,
  tanggal_event: Date,
  deskripsi_event: String,
  benefits: String,
  registered_people: {
    type: [registered],
    require:false
  },
});

module.exports = mongoose.model('Event', eventSchema);