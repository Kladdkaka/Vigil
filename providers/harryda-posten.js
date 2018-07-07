const { RssScraper } = require('../classes')

module.exports = () =>
  new RssScraper('Härryda-Posten', 'http://www.harrydaposten.se/feed/')
