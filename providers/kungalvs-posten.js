const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Kungälvs-Posten',
  'http://www.kungalvsposten.se/feed'
)
