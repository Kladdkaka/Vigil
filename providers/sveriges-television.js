const { Scraper } = require('../classes')

class SVTScraper extends Scraper {
  constructor() {
    super()

    this.provider = 'Sveriges Television'
  }

  async get() {
    const res = await this.axios.get(
      'https://nss-api.app.svt.se/page/?q=latest,limit=100'
    )

    const { data } = res

    const articles = data.latest.content.map(article => ({
      title: article.title,
      url: article.teaserURL, // safe? eller ska man ta svt.se domän + article.url?
      date: new Date(article.published),
      provider: this.provider
    }))

    return articles
  }
}

module.exports = () => new SVTScraper()
