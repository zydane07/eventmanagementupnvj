const { date } = require('joi');
const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  Id_Event : String,
  Nama_Event: String,
  Tanggal_Event : Date,
});

module.exports = mongoose.model('Events',eventsSchema);