const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Västerbottens-Kuriren',
  'http://www.vk.se/feed'
)
