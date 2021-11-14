const verifikasiEmail = require('../Models/verifEmail');
const Mahasiswa = require('../Models/mahasiswa');
const sendEmail = require('../Nodemailer/sendEmail');
const {nanoid} = require('nanoid');
exports.verifUser = async (req,res) => {
  try{
    //Validasi untuk verifikasi user
    const {token} = req.params;

    //Check apakah email sudah ada di database di collection untuk verif akun
    const checkDB = await verifikasiEmail.findOne({emailToken: token});
    if(!checkDB){
      /*
      return res.status(400).send({
        success: false,
        message: 'Token Invalid'
      })*/
      return res.render("ResendVerif", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Resend Verification",
        err: 'Token invalid, kirim ulang!'
      });
    }

    const checkUser = await Mahasiswa.findOne({email:checkDB.email});

    if(!checkUser){
      /*
      return res.status(400).send({
        success: false,
        message: 'Email tidak ditemukan!',
      })*/
      return res.render("ResendVerif", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Resend Verification",
        err: 'User dengan email tersebut tidak ada!'
      });
    }
    //Jika ada, akun diupdate menjadi sudah verifikasi
    await Mahasiswa.updateOne({email:checkUser.email},{isVerified: true});
    //Menghapus data di collectiopn verifikasiemail
    await verifikasiEmail.deleteOne({emailToken:token});
    return res.render("register3", {
      layout: "layouts/login-layout",
      css: "styleLoginUser",
      title: "register",
    });
    
    

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
    let link;
    const emailToken = await verifikasiEmail.findOne({email});
    if(!emailToken){
      const saveVerif = await new verifikasiEmail({
        email,
        emailToken:nanoid(10)
      }).save()
      link = `http://localhost:3000/verification/${saveVerif.emailToken}`
    }
    else{
      link = `http://localhost:3000/verification/${emailToken.emailToken}`
    }

    //Mengirim email kembali
    await sendEmail(process.env.TEST_GMAIL,'Verifikasi Email',
    `Use this link to verif your SIM-U Account: ${link} `)
    
    res.status(200).redirect('/register2');
  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: `Terjadi Kesalahan saat mengirimkan email ${err}`
    })
  }
}