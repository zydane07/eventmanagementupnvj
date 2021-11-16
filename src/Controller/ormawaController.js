const Event = require('../Models/event');
const valEvent = require('../ValidationModel/createEventVal');
const { customAlphabet } = require('nanoid');
const { model } = require('mongoose');

exports.createEvent = async(req,res) =>{
  try{
    const {nama_event, kategori, tanggal_event, detil_eo} = req.body;
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
    const token = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7); // create 7 digit token
    model.id = token();
    await new Event({
      id_event: model.id,
      nama_event,
      kategori,
      tanggal_event,
      detil_eo
    }).save();
    return res.status(200).send({
      success: true,
      message:'Berhasil membuat ormawa'
    })
  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: err
    });
  }
}