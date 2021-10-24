const bcrypt = require('bcrypt');
const Mahasiswa = require('../Models/mahasiswa');
const Otp = require('../Models/forgotPass');
const valReset = require('../ValidationModel/resetPasswordVal');

const resetPassword = async(req,res) =>{
  try{
    //Mengamil req.params token sebagai autentikasi
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    //Check DB collection otp apakah token di params valid.
    const akunReset = await Otp.findOne({otp:token});
    if(!akunReset){
      return res.send({
        success: false,
        message: 'Terjadi kesalahan pada OTP yang diberikan, kirim ulang lagi',
      });
    }
    //Check apakah user ada di database collection mahasiswa
    const akunMhs = await Mahasiswa.findOne({email:akunReset.email});
    if(!akunMhs){
      return res.send({
        success: false,
        message: 'Code OTP sudah expired'
      })
    }

    //Validasi input
    const validasiPass = valReset.validate(req.body);
    if (validasiPass.error) {
      return res.send({
        success: false,
        message: validasiPass.error.details[0].message,
      });
    }

    //Check apakah password dan confirmPass sama
    if (password !== confirmPassword) {
      return res.send({
        success: false,
        message: 'Password dan Confirm Password tidak sama',
      });
    }

    //Password baru akan di hash
    const hashPassword = await bcrypt.hash(password, 10);
    await Mahasiswa.updateOne({email: akunMhs.email},{password: hashPassword});
    await Otp.deleteOne({ otp: token });
    return res.send({
      success: true,
      message: 'Password berhasil diupdate!',
    });
  }
  catch(err){
    return res.send({ success: false, message: 'Terjadi kesalahan reset password' });
  }
}

module.exports=resetPassword
