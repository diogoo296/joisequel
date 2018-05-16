const Joi = require('joi')

const Rules = require('./rules')

const JoiSequel = Joi.extend((joi) => ({
  base: joi.object(),
  name: 'model',
  rules: Rules
}))

JoiSequel
  .model()
  .keys({
    a: Joi.string(),
    b: Joi.number()
  })
  .pick(['a'])

module.exports = JoiSequel
