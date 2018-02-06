const axios = require('axios').create({
  baseURL: 'https://www.aftonbladet.se/hyper-api/'
})

const SECTION_NAME = 'senastenytt'

const get = async () => {
  const res = await axios.get(`v1/pages/sections/${SECTION_NAME}`)

  const { data } = res

  const articles = Object.entries(data.items)
    .filter(([key, value]) => value.type === 'bundle' && key !== 'page-streamer')
    .map(([key, value]) => value.items)
    .reduce((accumlator, items) => [...accumlator, ...items], [])
    .filter(item => item.type === 'teaser')
    .map(teaser => ({
      title: teaser.title.value,
      url: teaser.target.uri, // temp
      date: new Date(teaser.timestamp),
      provider: 'Aftonbladet'
    }))

  return articles
}

module.exports = {
  get
}
