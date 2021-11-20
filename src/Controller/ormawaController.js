const Event = require('../Models/event');
const valEvent = require('../ValidationModel/createEventVal');
const { customAlphabet } = require('nanoid');
const { model } = require('mongoose');
const Ormawa = require('../Models/ormawa');

exports.createEvent = async(req,res) =>{
  try{
    const {nama_event, kategori, tanggal_event,deskripsi_event,benefits} = req.body;
    const result = valEvent.validate(req.body);
    if(result.error){
      /*
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });*/
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });
    }
    const ormawa = await Ormawa.findOne({nama_ormawa: req.user.nama});
    if(!ormawa){
      return res.status(400).send({
        success: false,
        message: 'Detail ormawa tidak ditemukan, coba lagi'
      });
    }
    const token = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7); // create 7 digit token
    model.id = token();
    await new Event({
      id_event: model.id,
      nama_event,
      kategori,
      tanggal_event,
      detil_eo: ormawa.id_ormawa,
      deskripsi_event,
      benefits,
      isVerified: false
    }).save();
    return res.redirect('/event-ormawa');
  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: err
    });
  }
}