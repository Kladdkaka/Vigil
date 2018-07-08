const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Vetlanda-Posten',
  'https://vetlandaposten.se/rss'
)
