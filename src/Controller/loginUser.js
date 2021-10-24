const valLogin = require('../ValidationModel/loginVal');
const Mahasiswa = require('../Models/mahasiswa');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req,res) =>{
  try{
    //Menerima input email dan password kemudian divalidasi
    const {email,password} = req.body;
    const result = valLogin.validate(req.body);

    if(result.error){
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });
    }
    //Database collection Mahasiswa dicheck apakah email sudah terdaftar
    const checkDB = await Mahasiswa.findOne({email});
    if(!checkDB){
      return res.status(404).send({
        success: false,
        message: 'User dengan email tersebut tidak ada!'
      });
    }

    //Check apakah password yang diinput benar
    const checkPass = await bcrypt.compare(password,checkDB.password);
    if(!checkPass){
      return res.status(404).send({
        success: false,
        message: 'Password salah!'
      });
    }

    //Check apakah akun sudah verified, jika belum akan disuruh untuk verifikasi terlebih dahulu
    if(checkDB.isVerified===false){
      return res.status(404).send({
        success: false,
        message: 'User harus melakukan verifikasi email terlebih dahulu!'
      })
    };

    //Bikin jsonwebtoken, kemudian disimpen di Cookie browser sebagai autentikasi nantinya.
    const payload = {email,nama:checkDB.nama_lengkap}
    const tokenUser = jwt.sign(payload,process.env.SECRET_KEY);
    res.cookie('dataUser',tokenUser);
    return res.redirect('/'); //Langsung diarahin ke home

  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: `test ${err}`
    })
  }
}

module.exports = login;