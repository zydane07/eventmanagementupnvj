const jwt = require('jsonwebtoken');

/**
 * @function auth (for access)
 * @description access denied for anonymous user if access some private endpoint.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authAdmin = async(req, res, next) => {
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
    
    if(req.user.role!=='admin'){
      return res.send({ success: false, message: 'Access Denied' });
    }
   
    
    return next();
  } catch (err) {
    return res.send({ success: false, message: 'Token Invalid' });
  }
};

module.exports = authAdmin;
