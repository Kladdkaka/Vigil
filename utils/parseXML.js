const xml2js = require('xml2js')

const parseXML = data => new Promise((resolve, reject) => { // I have no idea why xml2js is async...
  xml2js.parseString(data, (error, result) => {
    if (error) reject(error)
    else resolve(result)
  })
})

module.exports = parseXML
