const JoiModel = require('./joi_model')

module.exports = class JoiSequel {
  constructor (Model) {
    return JoiModel.extend((joi) => ({
      base: joi.object(), // TODO: set base using Model attributes
      name: Model.name
    }))
  }
}
