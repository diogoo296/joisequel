const Joi = require('joi')

const Rules = require('./rules')

const JoiModel = Joi.extend((joi) => ({
  base: joi.object(),
  name: 'model',
  rules: Rules
}))

module.exports = JoiModel
