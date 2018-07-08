const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Arbetarbladet',
  'https://arbetarbladet.se/feed'
)
