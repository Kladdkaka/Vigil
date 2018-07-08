const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Kungsbacka-Posten',
  'http://kungsbackaposten.se/feed'
)
