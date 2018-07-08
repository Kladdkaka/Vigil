const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Bohusläningen',
  'http://www.bohuslaningen.se/?rss'
)
