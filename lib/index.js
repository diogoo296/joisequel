const JoiModel = require('./joi_model')

const JoiSequel = (Model) => {
  JoiModel.extend((joi) => ({
    base: joi.object(), // TODO: set base using Model attributes
    name: Model.name
  }))
}

module.exports = JoiSequel
