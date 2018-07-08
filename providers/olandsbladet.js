const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Ölandsbladet',
  'http://www.olandsbladet.se/feed'
)
