const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Sydsvenskan',
  'https://www.sydsvenskan.se/rss.xml?latest=1'
)
