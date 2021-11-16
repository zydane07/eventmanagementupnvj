const Joi = require('Joi');

const valEvent = Joi.object({
  nama_event: Joi.string().min(6).max(120).required(),
  kategori: Joi.string().required(),
  tanggal_event: Joi.date().required(),
  detil_eo: Joi.number().required()
});

module.exports = valEvent;