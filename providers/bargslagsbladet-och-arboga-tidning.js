const { RssScraper } = require('../classes')

module.exports = new RssScraper(
  'Bärgslagsbladet och Arboga tidning',
  'https://bblat.se/feed'
)
