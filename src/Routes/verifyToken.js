const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
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
    console.log(req.user.nama);
    next();
  } catch (err) {
    return res.send({ success: false, message: 'Token Invalid' });
  }
};

module.exports = auth;
