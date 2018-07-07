const { RssScraper } = require('../classes')

module.exports = () =>
  new RssScraper('Svenska Dagbladet', 'https://www.svd.se/feed/articles.rss')
