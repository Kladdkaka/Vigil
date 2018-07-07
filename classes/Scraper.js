class Scraper {
  constructor(provider) {
    this.provider = provider
    this.axios = require('axios')
  }

  async get() {
    throw new Error('No get function defined.')
  }
}

module.exports = Scraper
