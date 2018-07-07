const { RssScraper } = require('../classes')

module.exports = () => new RssScraper('Dagens Nyheter', 'https://www.dn.se/nyheter/m/rss/')
