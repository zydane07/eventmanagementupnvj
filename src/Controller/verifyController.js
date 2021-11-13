const verifikasiEmail = require('../Models/verifEmail');
const Mahasiswa = require('../Models/mahasiswa');
const sendEmail = require('../Nodemailer/sendEmail');

exports.verifUser = async (req,res) => {
  try{
    //Validasi untuk verifikasi user
    const {token} = req.params;

    //Check apakah email sudah ada di database di collection untuk verif akun
    const checkDB = await verifikasiEmail.findOne({emailToken: token});
    if(!checkDB){
      return res.status(400).send({
        success: false,
        message: 'Token Invalid'
      })
    }

    const checkUser = await Mahasiswa.findOne({email:checkDB.email});

    if(!checkUser){
      return res.status(400).send({
        success: false,
        message: 'Email tidak ditemukan!',
      })
    }
    //Jika ada, akun diupdate menjadi sudah verifikasi
    await Mahasiswa.updateOne({email:checkUser.email},{isVerified: true});
    //Menghapus data di collectiopn verifikasiemail
    await verifikasiEmail.deleteOne({emailToken:token});
    return res.status(200).send({
      success: true,
      message: 'Akun berhasil diverifikasi!'
    })
    
    

  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: 'Terjadi kesalahan saat melakukan verifikasi'
    })
  }
}

exports.resendEmail = async(req,res)=>{
  try{
    //Menerima input email untuk resend email verif
    const {email}=req.body;

    if(!email){
      return res.status(400).send({
        success:false,
        message: 'Email tidak boleh kosong!'
      })
    }

    //Check kedatabase apakah user sudah pernah mengirim email verif.
    const emailToken = await verifikasiEmail.findOne({email});
    const link = `http://localhost:3000/verification/${emailToken.emailToken}`
    //Mengirim email kembali
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