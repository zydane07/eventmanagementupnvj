const Joi = require('joi');

const valResetPass = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

module.exports = valResetPass;
