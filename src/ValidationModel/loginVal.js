const Joi = require('joi');

const valLoginMhs = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = valLoginMhs;