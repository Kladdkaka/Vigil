const moment = require('moment')

const providers = require('./providers')

const p = Object.values(providers).map(factory => factory().get())

Promise.all(p)
  .then(results => [].concat(...results))
  .then(news =>
    news.map(article => ({ ...article, date: moment(article.date) }))
  )
  .then(news => news.sort((a, b) => b.date.diff(a.date)))
  .then(news =>
    news.forEach(article =>
      console.log(
        `${article.title} | ${article.provider} | ${article.date.fromNow()}`
      )
    )
  )
  .catch(error => console.error(error))
