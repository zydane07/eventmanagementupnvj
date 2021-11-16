const bcrypt = require('bcrypt');
const Ormawa = require('../Models/ormawa');
const valRegis = require('../ValidationModel/registerValOrmawa');

exports.register = async(req,res) =>{
  try{
    const {email_ormawa, nama_ormawa, password, repassword} = req.body;
    const result = valRegis.validate(req.body);
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

    //Check apakah email ormawa sudah ada
    const checkDB = await Ormawa.findOne({email_ormawa});
    if(checkDB){
      return res.status(400).send({
        success: false,
        message: 'Email sudah dipakai'
      });
    }
    if(password!==repassword){
      return res.status(400).send({
        success:false,
        message:'Password dan Konfirm Password tidak sama!'
      })
    }
    const hashPassword = await bcrypt.hash(password,10);
    const lengthSubject = await Ormawa.find({});
    await new Ormawa({
      id_ormawa: lengthSubject.length+1,
      email_ormawa,
      nama_ormawa,
      password: hashPassword,
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