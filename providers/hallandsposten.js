const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Hallandsposten',
  'http://www.hallandsposten.se/?rss'
)
