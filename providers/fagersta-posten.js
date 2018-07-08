const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Fagersta-Posten',
  'https://fagersta-posten.se/feed'
)
