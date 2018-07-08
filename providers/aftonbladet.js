const { Scraper } = require('../classes')

const SECTION_NAME = 'senastenytt'

class AftonbladetScraper extends Scraper {
  constructor() {
    super()

    this.provider = 'Aftonbladet'
  }

  async get() {
    const res = await this.axios.get(
      `https://www.aftonbladet.se/hyper-api/v1/pages/sections/${SECTION_NAME}`
    )

    const { data } = res

    const articles = Object.entries(data.items)
      .filter(
        ([key, value]) => value.type === 'bundle' && key !== 'page-streamer'
      )
      .map(([key, value]) => value.items)
      .reduce((accumlator, items) => [...accumlator, ...items], [])
      .filter(item => item.type === 'teaser')
      .map(teaser => ({
        title: teaser.title.value.trim(),
        url: teaser.target.uri, // temp
        date: new Date(teaser.timestamp),
        provider: this.provider
      }))

    return articles
  }
}

module.exports = new AftonbladetScraper()
