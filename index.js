const providers = require('./providers')

const provider = process.argv[2]

providers[provider].get()
    .then(data => console.log(data))
    .catch(error => console.error(error))
