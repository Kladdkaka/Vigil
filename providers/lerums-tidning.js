const axios = require('axios').create({
  baseURL: 'http://www.lerumstidning.se/'
})

const xml2js = require('xml2js')

const parseXML = data => new Promise((resolve, reject) => { // I have no idea why xml2js is async...
  xml2js.parseString(data, (error, result) => {
    if (error) reject(error)
    else resolve(result)
  })
})

const get = async () => {
  const res = await axios.get('feed/')

  const { data } = res

  const xml = await parseXML(data)

  const items = xml.rss.channel[0].item

  const articles = items
    .map(item => ({
      title: item.title[0],
      url: item.link[0],
      date: new Date(item.pubDate[0]),
      provider: 'Lerums Tidning'
    }))

  return articles
}

module.exports = {
  get
}
