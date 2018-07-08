const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Strömstads Tidning',
  'http://www.stromstadstidning.se/?rss'
)
