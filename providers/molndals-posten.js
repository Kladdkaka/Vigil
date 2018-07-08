const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Mölndals-Posten',
  'http://www.molndalsposten.se/feed'
)
