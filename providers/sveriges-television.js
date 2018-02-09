const axios = require('axios').create({
  baseURL: 'https://nss-api.app.svt.se/'
})

const get = async () => {
  const res = await axios.get(`page/`, {
    params: {
      q: 'latest,limit=100'
    }
  })

  const { data } = res

  const articles = data.latest.content
    .map(article => ({
      title: article.title,
      url: article.teaserURL, // safe? eller ska man ta svt.se domän + article.url?
      date: new Date(article.published),
      provider: 'Sveriges Television'
    }))

  return articles
}

module.exports = {
  get
}
