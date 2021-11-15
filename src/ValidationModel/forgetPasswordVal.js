const Joi = require('joi');

const valForgetPassMhs = Joi.object({
  email: Joi.string().email().required()
});

module.exports = valForgetPassMhs;
