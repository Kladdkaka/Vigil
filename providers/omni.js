const axios = require('axios').create({
  baseURL: 'https://omni-content.omni.news/'
})

const extract = key => object => object[key]
const filterByValue = (key, value) => array => array.filter(object => object[key] === value)
const log = obj => console.log(obj) || obj
const logLength = array => console.log(array.length) || array
const filter = func => array => array.filter(func)

const extractFromArray = ([obj]) => obj

const get = () => {
  return axios({
    method: 'get',
    url: 'articles',
    params: {
      articles: 'latest',
      limit: 20
    }
  })
        .then(extract('data'))
        .then(extract('articles'))
        .then(filterByValue('length', 1))
        .then(extractFromArray)
        .then(log)
        .then(logLength)
        .then(filterByValue('type', 'Article'))
        .then(logLength)
        .then(({ articles }) => articles.map(article => ({
          title: article.title.value,
          provider: 'omni'
        })))
}

module.exports = {
  get
}
