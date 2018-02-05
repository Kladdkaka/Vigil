const axios = require('axios').create({
  baseURL: 'https://omni-content.omni.news/'
})

const get = () => {
  return axios({
    method: 'get',
    url: 'articles',
    params: {
      articles: 'latest'
    }
  })
  .then(res => res.data)
}

module.exports = {
  get
}
