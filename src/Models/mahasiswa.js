const { date } = require('joi');
const mongoose = require('mongoose');

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
  isVerified: Boolean
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);