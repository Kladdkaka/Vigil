const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Österlenmagasinet',
  'http://www.osterlenmagasinet.se/feed'
)
