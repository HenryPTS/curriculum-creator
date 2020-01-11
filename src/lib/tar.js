const tar = require('tar')

async function create(file, C = '/', ...files) {
  try {
    const res = await tar.c({
      C,
      gzip: false,
      file
    }, [
      ...files
    ])
    console.log(file, 'created')
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = {
  create
}