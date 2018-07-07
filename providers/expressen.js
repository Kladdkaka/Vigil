const { RssScraper } = require('../classes')

module.exports = () =>
  new RssScraper('Expressen', 'https://feeds.expressen.se/')
