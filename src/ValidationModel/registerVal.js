const Joi = require('joi');

const valRegisMhs = Joi.object({
  email: Joi.string().email().required(),
  namaLengkap: Joi.string().required(),
  noHp: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required()
});

module.exports = valRegisMhs;