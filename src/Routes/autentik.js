const jwt = require('jsonwebtoken');
const Mahasiswa = require('../Models/mahasiswa');
const Ormawa = require('../Models/ormawa');
/**
 * @function auth
 * @description authentication if user exists
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const auth = async(req, res, next) => {
  /*
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
*/try{
  const token = req.cookies.dataUser
  
  if(!token){
    req.user = {nama: 'Stranger'};
    return next();
  }
  const verified = jwt.verify(token, process.env.SECRET_KEY);
  req.user = verified
 
  let checkNama;
    if(req.user.role==='mahasiswa'){
      checkNama = await Mahasiswa.findOne({email:req.user.email});
      req.user["nama"] = checkNama.nama_lengkap;
      req.user["photo"] = checkNama.photo.avatar;
    }
    else if(req.user.role==='ormawa'){
      checkNama = await Ormawa.findOne({email_ormawa:req.user.email});
      req.user["nama"] = checkNama.nama_ormawa;
    }
    return next();
}catch(err){
  return res.send({ success: false, message: `${err}` });
}
  
};

module.exports = auth;
