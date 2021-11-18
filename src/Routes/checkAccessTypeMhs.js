const jwt = require('jsonwebtoken');
/**
 * @function checkRole
 * @description check role
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const checkRole = async(req, res, next) => {
  /*
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
*/
  const token = req.cookies.dataUser

  if (!token) {
    return next();
  }
  try {
    
    if(req.user.role !== 'mahasiswa'){
      return res.redirect('/dashboard-ormawa');
    }
    return next();
  } catch (err) {
    return res.send({ success: false, message: 'Token Invalid' });
  }
};

module.exports = checkRole;
