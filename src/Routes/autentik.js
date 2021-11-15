const jwt = require('jsonwebtoken');
const Mahasiswa = require('../Models/mahasiswa');
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
  const checkNama = await Mahasiswa.findOne({email:req.user.email});
  req.user["nama"] = checkNama.nama_lengkap;

  return next();
}catch(err){
  return res.send({ success: false, message: 'Terjadi error' });
}
  
};

module.exports = auth;
