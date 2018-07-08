const { Scraper } = require('../classes')

class OmniScraper extends Scraper {
  constructor() {
    super()

    this.provider = 'Omni'
  }

  async get() {
    const res = await this.axios.get(
      'https://omni-content.omni.news/articles',
      {
        params: {
          articles: 'latest',
          limit: 20
        }
      }
    )

    const { data } = res

    const articles = data.articles
      .filter(list => list.length === 1)
      .map(([article]) => article)
      .filter(article => article.type === 'Article')
      .map(article => ({
        title: article.title.value.trim(),
        url: `https://omni.se/a/${article.article_id}`,
        date: new Date(article.changes.published),
        provider: this.provider
      }))

    return articles
  }
}

module.exports = new OmniScraper()
