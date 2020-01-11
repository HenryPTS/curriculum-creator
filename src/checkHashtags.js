const { createHash } = require('./lib/crypto')
const { filesExist, readFile } = require('./lib/fs')
const { outBase } = require('./utils')

async function checkHashtags(body, style) {
  let hash, filesPresent
  try {
    hash = await createHash([body, style])
    filesPresent = await filesExist(
      outBase(), [
      'index.html',
      'style.css',
      /curriculum.+\.pdf/
      ]
    )
    if (!filesPresent) return [hash, false, filesPresent]
  } catch (error) {
    console.log(error)
  }
  
  let infoKey
  try {
    const indexHtml = await readFile(outBase('index.html'))
    const styleCss = await readFile(outBase('style.css'))
    infoKey = await createHash([indexHtml, styleCss])
  } catch (error) {
    throw error
  }
  return [hash, hash === infoKey, filesPresent]
}

module.exports = checkHashtags