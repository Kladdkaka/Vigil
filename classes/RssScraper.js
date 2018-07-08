const Scraper = require('./Scraper') // safe to do require('.') :o?

const { parseXML } = require('../utils')

class RssScraper extends Scraper {
  constructor(provider, url) {
    super(provider)

    this.url = url
  }

  async get() {
    const res = await this.axios.get(this.url)

    const { data } = res

    console.log(this.url)

    const xml = await parseXML(data)

    const items = xml.rss.channel[0].item

    const articles = items.map(item => ({
      title: item.title[0].trim(),
      url: item.link[0],
      date: new Date(item.pubDate[0]),
      provider: this.provider
    }))

    return articles
  }
}

module.exports = RssScraper
