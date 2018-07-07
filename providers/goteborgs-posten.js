const { Scraper } = require('../classes')

const moment = require('moment-timezone')
const cheerio = require('cheerio')

const { parseXML } = require('../utils')

class PremiumArticleError extends Error {
  constructor(...args) {
    super(...args)
    this.name = this.constructor.name
  }
}

class GPScraper extends Scraper {
  constructor() {
    super()

    this.provider = 'Göteborgs-Posten'
  }

  async getDateForArticle(url) {
    const res = await this.axios.get(url)
    const $ = cheerio.load(res.data)

    const isPremium = $('article.premium.no-access').length > 0

    if (isPremium) {
      throw new PremiumArticleError('Premium article.')
    }

    const dateString = $('time')
      .text()
      .trim()

    return moment
      .tz(dateString, 'HH:mm - DD MMM, YYYY', 'Europe/Stockholm')
      .toDate()
  }

  async get() {
    const res = await this.axios.get('http://www.gp.se/?rss')
    const xml = await parseXML(res.data)

    const items = xml.rss.channel[0].item

    let articles = []

    for (const item of items) {
      // Online = paywall? Newspilot = outhouse content? time can be wrong. TT = TT (time could be wrong but probably not a problem), Writer = inhouse
      let date

      if (item.sources && item.sources[0].source[0] === 'Newspilot') {
        // probably only one writer
        // console.log(item.link[0])
        // add debug message thingie?
        try {
          date = await this.getDateForArticle(item.link[0])
        } catch (error) {
          if (error.name === 'PremiumArticleError') {
            // would instanceof work instead as intended?
            continue
          } else {
            throw error
          }
        }
      }

      articles.push({
        title: item.title[0],
        url: item.link[0],
        date: date || new Date(item.pubDate[0]),
        provider: this.provider
      })
    }

    return articles
  }
}

module.exports = new GPScraper()
