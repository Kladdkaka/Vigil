const axios = require('axios').create({
  baseURL: 'https://omni-content.omni.news/'
})

const get = async () => {
  const res = await axios({
    method: 'get',
    url: 'articles',
    params: {
      articles: 'latest',
      limit: 20
    }
  })

  const { data } = res

  const articles = data.articles
    .filter(list => list.length === 1)
    .map(([article]) => article)
    .filter(article => article.type === 'Article')
    .map(article => ({
      title: article.title.value,
      url: `https://omni.se/a/${article.article_id}`,
      date: new Date(article.changes.published),
      provider: 'Omni'
    }))

  return articles
}

module.exports = {
  get
}
