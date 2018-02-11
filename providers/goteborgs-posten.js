const axios = require('axios').create({
  baseURL: 'http://www.gp.se/'
})

const cheerio = require('cheerio')
const xml2js = require('xml2js')

const parseXML = data => new Promise((resolve, reject) => { // I have no idea why xml2js is async...
  xml2js.parseString(data, (error, result) => {
    if (error) reject(error)
    else resolve(result)
  })
})

const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

const getDateForArticle = async url => {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  const isPremium = $('article.premium.no-access').length > 0

  if (isPremium) {
    throw new Error('Premium article.')
  }

  const dateString = $('time').text().trim().replace(/, | - |:/g, ' ')
  let [hours, minutes, days, month, year] = dateString.split(' ')

  month = monthNames.indexOf(month);

  [hours, minutes, days, month, year] = [hours, minutes, days, month, year].map(x => +x)

  console.log(hours, minutes, days, month, year)
}

const get = async () => {
  const res = await axios.get('?rss')
  const xml = await parseXML(res.data)

  const items = xml.rss.channel[0].item

  let articles = []

  console.log(items[0])

  for (const item of items) { // Online = paywall? Newspilot = outhouse content? time can be wrong. TT = TT (time could be wrong but probably not a problem), Writer = inhouse
    if (item.sources[0].source[0] === 'Newspilot') { // probably only one writer

    }
  }

  return articles
}

module.exports = {
  get
}
