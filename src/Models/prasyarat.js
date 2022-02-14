const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
  },
  id_event: {
    type: String,
    required: true,
    unique: true,
  },
  bukti: {
    prasyarat1: {
      photo: { 
        type:  String,
        
      },
      cloudinary_id: {
        type: String,
        
      }
    },
    prasyarat2:{
      photo: { 
        type:  String,
       
      },
      cloudinary_id: {
        type: String,
        
      }
    },
    prasyarat3: {
      photo: { 
        type:  String
       
      },
      cloudinary_id: {
        type: String,
        
      }
    },
  }
});