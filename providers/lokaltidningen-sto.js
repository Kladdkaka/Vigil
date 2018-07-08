const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Lokaltidningen STO',
  'http://www.lokaltidningensto.se/feed'
)
