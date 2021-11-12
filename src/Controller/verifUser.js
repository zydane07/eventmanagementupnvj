const verifikasiEmail = require('../Models/verifEmail');
const Mahasiswa = require('../Models/mahasiswa');

const verifikasi = async(req,res)=>{
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

module.exports=verifikasi;