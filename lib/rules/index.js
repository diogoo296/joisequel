const path = require('path')
const readdirSync = require('fs').readdirSync

module.exports = readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && path.extname(file) !== 'js')
  .map((file) => require(path.join(__dirname, file)))
