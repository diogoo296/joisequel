const { join } = require('path')

const JoiSequel = require('../lib')
const models = require('../lib/models_stub')(join(__dirname, 'models'))

const test = require('../lib/models_stub')
test()

describe('JoiSequel', function () {
  it('should create a new JoiSequel object', function () {
    const JS = new JoiSequel(models.Chip)
    console.log(JS)
  })
})
