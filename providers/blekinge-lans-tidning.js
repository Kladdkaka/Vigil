const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Blekinge Läns Tidning',
  'http://www.blt.se/feed/'
)
