const { RssScraper } = require('../classes')

module.exports = () => new RssScraper('Lerums Tidning', 'http://www.lerumstidning.se/feed/')
