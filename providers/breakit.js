const urlJoin = require('url-join')
const moment = require('moment')

const { Scraper } = require('../classes')

class Breakit extends Scraper {
  constructor() {
    super()

    this.provider = 'Breakit'
  }

  async get() {
    const res = await this.axios.get(
      'https://www.breakit.se/api/article/latest?limit=100'
    )

    const { data } = res

    const articles = data.map(article => ({
      title: article.name,
      url: urlJoin('https://www.breakit.se/', article.url),
      date: moment.tz(article.date, 'Europe/Stockholm').toDate(),
      provider: this.provider
    }))

    return articles
  }
}

module.exports = new Breakit()
