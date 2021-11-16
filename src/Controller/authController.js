const { customAlphabet } = require('nanoid');
const Mahasiswa = require('../Models/mahasiswa');
const forgetVal = require('../ValidationModel/forgetPasswordVal');
const Otp = require('../Models/forgotPass');
const sendEmail = require('../Nodemailer/sendEmail');
const valLogin = require('../ValidationModel/loginVal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const valReset = require('../ValidationModel/resetPasswordVal');

exports.login = async (req,res) => {
  try{
    //Menerima input email dan password kemudian divalidasi
    const {email,password} = req.body;
    const result = valLogin.validate(req.body);

    if(result.error){
      /*
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });*/
      return res.render("login", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "login",
        error: 'Data yang dimasukkan tidak sesuai'
      });
    }
    //Database collection Mahasiswa dicheck apakah email sudah terdaftar
    const checkDB = await Mahasiswa.findOne({email});
    if(!checkDB){
      /*
      return res.status(404).send({
        success: false,
        message: 'User dengan email tersebut tidak ada!'
      });*/
      return res.render("login", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "login",
        error: 'User dengan email tersebut tidak ada'
      });
    }

    //Check apakah password yang diinput benar
    const checkPass = await bcrypt.compare(password,checkDB.password);
    if(!checkPass){
      /*
      return res.status(404).send({
        success: false,
        message: 'Password salah!'
      });*/
      return res.render("login", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "login",
        error: 'Password salah!'
      });
    }

    //Check apakah akun sudah verified, jika belum akan disuruh untuk verifikasi terlebih dahulu
    if(checkDB.isVerified===false){
      /*
      return res.status(404).send({
        success: false,
        message: 'User harus melakukan verifikasi email terlebih dahulu!'
      })*/
      return res.render("login", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "login",
        error: 'User harus melakukan verifikasi email dahulu!'
      });
    };

    //Bikin jsonwebtoken, kemudian disimpen di Cookie browser sebagai autentikasi nantinya.
    const payload = {email}
    const tokenUser = jwt.sign(payload,process.env.SECRET_KEY);
    res.cookie('dataUser',tokenUser);
    return res.redirect('/');

  }
  catch(err){
    /*
    return res.status(400).send({
      success: false,
      message: `test ${err}`
    })*/
    return res.render("login", {
      layout: "layouts/login-layout",
      css: "styleLoginUser",
      title: "login",
      error: 'Terjadi kesalahan login, coba lagi'
    });
  }
}

exports.logout = async(req,res) =>{
    try{
      await res.clearCookie("dataUser");
		  return res.redirect('/login');
    }
		catch(err){
      console.log(err);
    }
	
}

exports.resetPassword = async(req,res) =>{
  try{
    //Mengamil req.params token sebagai autentikasi
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    //Check DB collection otp apakah token di params valid.
    const akunReset = await Otp.findOne({otp:token});
    if(!akunReset){
      /*
      return res.send({
        success: false,
        message: 'Terjadi kesalahan pada OTP yang diberikan, kirim ulang lagi',
      });*/
      return res.render("LupaPass", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Forget Password",
        err: 'Code OTP sudah expired, kirim lagi!'
      });
    }
    //Check apakah user ada di database collection mahasiswa
    const akunMhs = await Mahasiswa.findOne({email:akunReset.email});
    if(!akunMhs){
      /*
      return res.send({
        success: false,
        message: 'Akun tidak valid!'
      })*/
      return res.render("LupaPass", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Forget Password",
        err: 'Akun tidak valid!'
      });
    }

    //Validasi input
    const validasiPass = valReset.validate(req.body);
    if (validasiPass.error) {
      /*
      return res.send({
        success: false,
        message: validasiPass.error.details[0].message,
      });*/
      return res.render("LupaPass3", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Forget Password",
        err: 'Input yang dimasukkan tidak sesuai'
      });
    }

    //Check apakah password dan confirmPass sama
    if (password !== confirmPassword) {
      /*
      return res.send({
        success: false,
        message: 'Password dan Confirm Password tidak sama',
      });*/
      return res.render("LupaPass3", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Forget Password",
        err: 'Password tidak sama'
      });
    }

    //Password baru akan di hash
    const hashPassword = await bcrypt.hash(password, 10);
    await Mahasiswa.updateOne({email: akunMhs.email},{password: hashPassword});
    await Otp.deleteOne({ otp: token });
    return res.redirect('/LupaPass4');
  }
  catch(err){
    return res.send({ success: false, message: 'Terjadi kesalahan reset password' });
  }
}

exports.forgotPassword = async(req,res) =>{
  try{
    const { email } = req.body;
    //Validasi input email
    const result = forgetVal.validate(req.body);
    if(result.error){
      return res.status(400).send({
        success:false,
        message: result.error.details[0].message,
      })
    }

    //Cek database collection Mahasiswa apakah ada emailnya
    const checkDB = await Mahasiswa.findOne({email});
    if(!checkDB){
      return res,send({
        success: false,
        message: 'User dengan email tersebut tidak ada!'
      });
    }

    //Jika ada, akan dikirim OTP ke email user
    const codeOtp = await Otp.findOne({ email });
    const nanoid = customAlphabet('1234567890',4);
    if (!codeOtp) {
      // nyimpen email yg mau forgot password dan otp 4 digit (waktunya 300s) sebelum expired
      const saveotp = await new Otp({
        email,
        otp: nanoid(),
      }).save();
      const link = `http://localhost:3000/reset-password/${saveotp.otp}`;
      // ngirim kode otp ke email forgot password, untuk sekarang masih make email dummy 
      await sendEmail(process.env.TEST_GMAIL, 'Lupa password?', `Gunakan link ini untuk mereset password anda:${link}`);
      // Kode OTP berhasil dikirim
      return res.redirect('/LupaPass2');
    }
    // kode otp dengan email sekian masih ada
    return res.send({
      success: false,
      message: `OTP reset password untuk email ${email} masih ada`,
    });
  }
  catch(err){
    return res.send({ success: false, message: `${err}` });
  }
}