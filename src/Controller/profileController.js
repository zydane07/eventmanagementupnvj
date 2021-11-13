const Mahasiswa = require('../Models/mahasiswa');

exports.profile = async(req,res)=>{
  try{
    //Mencari profile di database collection Mahasiswa email yang ada di cookie
    const profileMhs = await Mahasiswa.findOne({email:req.user.email});
    if(!profileMhs){
      return res.send({
        success: false,
        message: 'User tidak ada',
      });
    }/*
    return res.status(200).send({
      success: true,
      data:{
        user:{
          email: profileMhs.email,
          nama_lengkap: profileMhs.nama_lengkap,
          tanggal_lahir: profileMhs.tanggal_lahir,
          Jenis_Kelamin: profileMhs.jenis_kelamin,
          nim: profileMhs.nim,
          prodi: profileMhs.prodi,
          fakultas: profileMhs.fakultas,
          angkatan: profileMhs.angkatan,
          no_hp:profileMhs.no_hp,
          photo: profileMhs.photo
        }
      }
    })*/
    res.render("profile", {
      layout: "layouts/main-layout",
      title: "Profile",
      css: "styleProfile",
    });
  }
  catch(err){
    return res.send({
      success: false,
      message: 'Gagal load profile',
    });
  }
}