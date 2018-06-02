const { readdirSync } = require('fs')
const { extname, join } = require('path')
const SequelizeMock = require('sequelize-mock')

const sequelizeMock = new SequelizeMock()
const define = (new SequelizeMock()).define.bind(sequelizeMock)

// Stub prototype object in sequelize define return
sequelizeMock.define = (name, obj, opts) => {
  return Object.assign(
    { prototype: {} },
    define(name, obj, opts)
  )
}

class Model {
  constructor (filePath) {
    const modelMock = sequelizeMock.import(filePath)
    this.name = modelMock.name
    this.attributes = modelMock._defaults
  }
}

/**
 * Creates stubs for all models in modelsPath.
 * @param {String} modelsPath Models directory full path
*/
module.exports = (modelsPath) => {
  return readdirSync(modelsPath)
    .filter((file) => file !== 'index.js' && extname(file) !== 'js')
    .reduce(
      (models, file) => {
        const model = new Model(join(modelsPath, file))
        models[model.name] = model

        return models
      },
      {}
    )
}
