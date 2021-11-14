const mongoose = require('mongoose');

const savedEvent = mongoose.Schema({
  id_event: Number,
  nama_event: String,
  poster_event: String,
  tanggal_event: Date,
});

const historyEvent = mongoose.Schema({
  id_event: Number,
  nama_event: String,
  poster_event: String,
  tanggal_event: Date,
});

const mahasiswaSchema = mongoose.Schema({
  email: String,
  nama_lengkap: String,
  password: String,
  no_hp: String,
  jenis_kelamin: String,
  tanggal_lahir: Date,
  nim: String,
  fakultas: String,
  prodi: String,
  angkatan: String,
  photo: String,
  isVerified: Boolean,
  savedEvent: {
    type:[savedEvent],
    require: false
  },
  historyEvent: {
    type:[historyEvent],
    require:false
  }
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);