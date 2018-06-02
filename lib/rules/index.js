const { readdirSync } = require('fs')
const { extname, join } = require('path')

module.exports = readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && extname(file) !== 'js')
  .map((file) => require(join(__dirname, file)))
