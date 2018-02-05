const willError = () => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('good boy')), 1000)
})

async function main () {
  await willError()
}

main()
  .then(() => console.log('Success'))
  .catch(error => console.log('hi') || console.error(error))
