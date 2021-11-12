const bcrypt = require('bcrypt');
const Mahasiswa = require('../Models/mahasiswa');
const valRegis = require('../ValidationModel/registerVal');
const sendEmail = require('../Nodemailer/sendEmail');
const verifEmail = require('../Models/verifEmail')
const {nanoid} = require('nanoid');

const register = async(req,res)=>{
  try{
    //Menerima input kemudian di validasi
    const {email,namaLengkap,noHp,password,repassword} = req.body;
    const result = valRegis.validate(req.body);

    if(result.error){
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });
    }

    //Check apakah email sudah ada
    const checkDB = await Mahasiswa.findOne({email});
    if(checkDB){
      return res.status(400).send({
        success: false,
        message: 'Email sudah terdaftar!',
      })
    }

    //Check apakah password dan repassword sama
    if(password!==repassword){
      return res.status(400).send({
        success:false,
        message:'Password dan Konfirm Password tidak sama!'
      })
    }
    
    //Menghashing password
    const hashPassword = await bcrypt.hash(password,10);
    //Menyimpan akun baru kedalam database collection mahasiswa
    const regisMahasiswa = await new Mahasiswa({
      email,
      nama_lengkap: namaLengkap,
      password: hashPassword,
      no_hp:noHp,
      isVerified: false
    })
    regisMahasiswa.save();

    //Mengirimkan email untuk melakukan verifikasi, jika sudah pernah, maka tidak akan dikirim lagi
    const verif = await verifEmail.findOne({email});
    if(verif){
      return res.status(400).send({
        success: false,
        message: 'Email sudah pernah dikirimkan verifikasi'
      })
    }
    //Memasukkan email dan tokenemail ke collection VerifEmail di database.
    const saveVerif = await new verifEmail({
      email,
      emailToken:nanoid(10)
    }).save()

    //Link untuk verifikasi yang akan dikirimkan ke email
    const link = `http://localhost:3000/verification/${saveVerif.emailToken}`
    await sendEmail(process.env.TEST_GMAIL,'Verifikasi Email',
    `Use this link to verif your SIM-U Account: ${link} `)
    
    return res.status(200).send({
      success: true,
      message: 'Verifikasi berhasil dikirimkan ke email user'
    })
  }

  catch(err){
    return res.status(400).send({
      success: false,
      message: `Terjadi Kesalahan saat mengirimkan email`
    })
  }
}

module.exports=register;