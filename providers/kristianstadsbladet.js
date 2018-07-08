const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Kristianstadsbladet',
  'http://www.kristianstadsbladet.se/feed'
)
