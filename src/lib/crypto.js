const crypto = require('crypto')

function createHash(data) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data)) data = data.join('__')
    const hash = crypto
      .createHash('md5', 'hex')
      .update(data, 'utf8')
      .digest('hex')
    if (!hash) return reject('No hash')
    return resolve(hash)
  })
}

module.exports = {
  createHash
}