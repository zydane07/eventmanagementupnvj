const { date } = require('joi');
const mongoose = require('mongoose');

const registered = mongoose.Schema({
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const eventSchema = mongoose.Schema({
  id_event: {
    type: String,
    required: true,
    unique: true,
  },
  poster_event: String,
  kategori: {
    type: String,
    required: true,
    enum: ['Webinar','Workshop','Lomba','Lainnya'],
  },
  nama_event: {
    type: String,
    required: true
  },
  tanggal_event:{
    type: Date,
    required: true,
  },
  detil_eo:{
    type:Number,
    required: true,
  },
  deskripsi_event: String,
  benefits: String,
  registered_people: {
    type: [registered],
    require:false
  },
  isVerified: {
    type:Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Event', eventSchema);