const path = require('path')
const fs = require('fs')

exports.getJson = function(url) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, url), 'utf-8'))
}
