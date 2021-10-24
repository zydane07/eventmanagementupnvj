const { customAlphabet } = require('nanoid');
const Mahasiswa = require('../Models/mahasiswa');
const forgetVal = require('../ValidationModel/forgetPasswordVal');
const Otp = require('../Models/forgotPass');
const sendEmail = require('../Nodemailer/sendEmail');

const forgetPassword = async(req,res)=>{
  try{
    const { email } = req.body;
    //Validasi input email
    const result = await forgetVal.validate(req.body);
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
      return res.send({
        success: true,
        message: 'OTP reset password berhasil dikirim',
      });
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

module.exports = forgetPassword;