const verifikasiEmail = require('../Models/verifEmail');
const sendEmail = require('../Nodemailer/sendEmail');

const resendEmail = async(req,res)=>{
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

module.exports=resendEmail;