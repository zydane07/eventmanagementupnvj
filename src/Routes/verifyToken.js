const jwt = require('jsonwebtoken');
const Mahasiswa = require('../Models/mahasiswa');
/**
 * @function auth (for access)
 * @description access denied for anonymous user if access some private endpoint.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const auth = async(req, res, next) => {
  /*
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
*/
  const token = req.cookies.dataUser
  
  if (!token) {
    return res.send({ success: false, message: 'Access Denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified
    const checkNama = await Mahasiswa.findOne({email:req.user.email});
    req.user["nama"] = checkNama.nama_lengkap;
    return next();
  } catch (err) {
    return res.send({ success: false, message: 'Token Invalid' });
  }
};

module.exports = auth;
