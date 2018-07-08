const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Södermanlands Nyheter',
  'https://www.sn.se/feed/'
)
