const { expect } = require('chai')
const { join } = require('path')
const SequelizeMock = require('sequelize-mock')

const SequelizeModel = require('../lib/sequelize_model')

describe('SequelizeModel', function () {
  it('should create a valid SequelizeModel from SimpleModel', function () {
    const SimpleModel = new SequelizeModel(
      join(__dirname, './models/simple_model')
    )
    expect(SimpleModel.name).to.be.equal('SimpleModel')
    expect(SimpleModel.attributes).to.be.deep.equal({
      id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      stringColumn: {
        type: SequelizeMock.STRING,
        description: 'string'
      }
    })
  })
})
