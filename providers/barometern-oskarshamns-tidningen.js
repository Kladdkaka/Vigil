const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Barometern Oskarshamns-Tidningen',
  'http://www.barometern.se/feed/'
)
