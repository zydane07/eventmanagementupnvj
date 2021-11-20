const mongoose = require('mongoose');

const savedEvent = mongoose.Schema({
  id_event: String
});

const historyEvent = mongoose.Schema({
  id_event: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  photo: {
    avatar: { 
      type:  String,
      default: 'https://res.cloudinary.com/dz1q2dbty/image/upload/v1637411143/ifpbpwuf5yrtlgbexgf1.png'
    },
    cloudinary_id: {
      type: String,
      default: 'ifpbpwuf5yrtlgbexgf1'
    }
  },
  isVerified: Boolean,
  savedEvent: {
    type:[savedEvent],
    require: false
  },
  historyEvent: [historyEvent]
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);