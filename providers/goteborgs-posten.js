const axios = require('axios').create({
  baseURL: 'http://www.gp.se/'
})

const moment = require('moment-timezone')
const cheerio = require('cheerio')
const xml2js = require('xml2js')

const parseXML = data => new Promise((resolve, reject) => { // I have no idea why xml2js is async...
  xml2js.parseString(data, (error, result) => {
    if (error) reject(error)
    else resolve(result)
  })
})

const getDateForArticle = async url => {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  const isPremium = $('article.premium.no-access').length > 0

  if (isPremium) {
    throw new Error('Premium article.')
  }

  const dateString = $('time').text().trim()

  return moment.tz(dateString, 'HH:mm - DD MMM, YYYY', 'Europe/Stockholm').toDate()
}

const get = async () => {
  const res = await axios.get('?rss')
  const xml = await parseXML(res.data)

  const items = xml.rss.channel[0].item

  let articles = []

  for (const item of items) { // Online = paywall? Newspilot = outhouse content? time can be wrong. TT = TT (time could be wrong but probably not a problem), Writer = inhouse
    let date

    if (item.sources && item.sources[0].source[0] === 'Newspilot') { // probably only one writer
      console.log(item.link[0])
      date = await getDateForArticle(item.link[0])
    }

    articles.push({
      title: item.title[0],
      url: item.link[0],
      date: date || new Date(item.pubDate[0]),
      provider: 'Göteborgs-Posten'
    })
  }

  return articles
}

module.exports = {
  get
}
