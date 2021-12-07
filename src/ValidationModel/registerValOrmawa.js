const Joi = require('joi');

const valRegisOrm = Joi.object({
  email_ormawa: Joi.string().email().required(),
  nama_ormawa: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required(),
});

module.exports = valRegisOrm;