const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  /*
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
*/
  const token = req.cookies.dataUser
  const verified = jwt.verify(token, process.env.SECRET_KEY);
  req.user = verified
  next();
};

module.exports = auth;
