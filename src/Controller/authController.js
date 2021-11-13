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
    res.redirect('/');

  }
  catch(err){
    return res.status(400).send({
      success: false,
      message: `test ${err}`
    })
  }
}

exports.logout = async (req,res) =>{
  try{
		// console.log(req.user);
		res.clearCookie("dataUser");

		return res.send({
			success : true,
			message : 'Logout Berhasil'
		});
	}
	catch{
		return res.send({
			success : false,
			message : 'Logout Gagal'
		});
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
      const link = `http://localhost:3000/api/auth/reset-password/${saveotp.otp}`;
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