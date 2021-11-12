const { date } = require('joi');
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  id_join: String,
  email: String,
  id_event: String,
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);